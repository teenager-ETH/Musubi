import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from '~/configs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { exec } from 'node:child_process';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async findQuestion(id: string) {
    const quesConfig =
      this.configService.get<IConfig['questions']>('questions')!;
    const test = (
      await fs.readFile(path.resolve(quesConfig.path, id, 'test.js'))
    ).toString();
    const code = (
      await fs.readFile(path.resolve(quesConfig.path, id, 'code.sol'))
    ).toString();
    return {
      test,
      code,
    };
  }

  async runTest(project: Record<string, any>) {
    const templateConfig =
      this.configService.get<IConfig['template']>('template')!;
    const temporaryConfig =
      this.configService.get<IConfig['temporary']>('temporary')!;
    const random = Math.floor(Math.random() * 100000).toString();
    const folder = path.resolve(temporaryConfig.path, random);
    await fs.mkdir(folder, {
      recursive: true,
    });
    await fs.cp(templateConfig.path, folder, {
      recursive: true,
    });
    this.transProjectPath(project, folder);
    await this.json2Folder(project);
    exec(`${folder}/run.sh`);
    return {
      id: random,
    };
  }

  public async findResult(id: string) {
    const temporaryConfig =
      this.configService.get<IConfig['temporary']>('temporary')!;
    const folder = path.resolve(temporaryConfig.path, id);
    let result: string | null = null;
    try {
      result = await fs.readFile(path.join(folder, 'completed'), 'utf-8');
    } catch (e: unknown) {
      //
    }
    if (!result) {
      return {
        status: 'running',
      };
    }
    const startFlag = '\\*-COMPILEBOX::REPORTER-START-\\*';
    const endFlag = '\\*-COMPILEBOX::REPORTER-END-\\*';
    const regexp = new RegExp(`${startFlag}([\\s\\S]*?)${endFlag}`);
    const reporterStr = regexp.exec(result)?.[1].trim();
    if (!reporterStr) {
      return {
        status: 'completed',
        result: 'wrong',
      };
    }

    let reporter: Record<string, any> | null = null;
    try {
      reporter = JSON.parse(reporterStr);
    } catch (e) {}
    if (!reporter) {
      return {
        status: 'completed',
        result: 'wrong',
      };
    }
    const finalResult =
      reporter.stats.passes > 0 && reporter.stats.failures <= 0
        ? 'correct'
        : 'wrong';
    const passCount = reporter.stats.passes;
    const failCount = reporter.stats.failures;

    return {
      status: 'completed',
      result: finalResult,
      passCount,
      failCount,
    };
  }

  public async questions() {
    const quesConfig =
      this.configService.get<IConfig['questions']>('questions')!;
    const questions: Array<{
      id: string;
      title: string;
      description: string;
      question: string;
    }> = [];
    const dirs = await fs.readdir(quesConfig.path);
    for (let i = 0; i < dirs.length; ++i) {
      const dir = dirs[i];

      const question = (
        await fs.readFile(path.resolve(quesConfig.path, dir, 'code.sol'))
      ).toString();
      const meta = JSON.parse(
        (
          await fs.readFile(path.resolve(quesConfig.path, dir, 'meta.json'))
        ).toString()
      );
      questions.push({
        id: dir,
        title: meta.title,
        description: meta.description,
        question,
      });
    }
    return questions;
  }

  private async json2Folder(schema: Record<string, any>) {
    if (schema.type === 'file') {
      await fs.writeFile(schema.path, schema.content ?? '');
    }
    if (schema.type === 'directory') {
      await fs.mkdir(schema.path, {
        recursive: true,
      });
      if (!schema.children.length) {
        return;
      }
      for (let i = 0; i < schema.children.length; ++i) {
        await this.json2Folder(schema.children[i]);
      }
    }
  }

  private transProjectPath(project: Record<string, any>, basePath: string) {
    project.path = path.join(basePath, project.path);
    if (project.type === 'directory' && project.children?.length) {
      project.children.forEach((sub: Record<string, any>) =>
        this.transProjectPath(sub, basePath)
      );
    }
  }
}
