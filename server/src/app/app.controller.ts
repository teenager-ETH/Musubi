import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  Get,
} from "@nestjs/common";

import { HttpExceptionFilter } from "~/shared/http-exception.filter";
import { RestValidationPipe } from "~/shared/rest-validation.pipe";
import { StandardException } from "~/shared/standard.exception";
import { SuccessResInterceptor } from "~/shared/success-res.interceptor";
import { JudgerRunDto, JudgerResultDto } from "./dto/judgerRun.dto";
import { AppService } from "./app.service";

@Controller()
@UsePipes(RestValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessResInterceptor)
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/')
  hello() {
    return 'Hello World!';
  }

  @Post("questions") 
  async questions() {
    const result = await this.appService.questions();
    return result;
  }

  @Post("run")
  async run(@Body() body: JudgerRunDto) {
    const { code, questionId } = body;

    const ques = await this.appService.findQuestion(questionId);
    if (!ques) {
      throw new StandardException('fail');
    }
    // 构造project
    const project = {
      name: "",
      path: "/",
      type: "directory",
      children: [
        {
          name: "file.sol",
          path: "/contracts/file.sol",
          type: "file",
          content: code,
        },
        {
          name: "file.js",
          type: "file",
          path: "/test/file.js",
          content: ques.test,
        },
      ],
    };

    const result = await this.appService.runTest(project);
    if (!result.id) {
      throw new StandardException('fail');
    }
    return {
      judgeId: result.id,
    };
  }

  @Post("result")
  async result(@Body() body: JudgerResultDto) {
    const { judgeId } = body;
    const judgeJob = await this.appService.findResult(judgeId);
    if (!judgeJob) {
      throw new StandardException('fail');
    }
    return {
      status: judgeJob.status,
      passCount: judgeJob.passCount,
      failCount: judgeJob.failCount,
      result: judgeJob.result,
    };
  }
}
