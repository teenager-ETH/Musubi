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
import { UserSignUpDto } from "./dto/userSignUp.dto";
import { UserStateTransitionDto } from "./dto/userStateTransition.dto";
import { SealEpochDto } from "./dto/sealEpoch.dto";
import { ApplyDto } from "./dto/createApplication.dto";


@Controller()
@UsePipes(RestValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessResInterceptor)
export class AppController {
  constructor(private appService: AppService) { }

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
        {
          name: "question.json",
          type: "file",
          path: "question.json",
          content: JSON.stringify(ques),
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
    let attest;
    const { judgeId, epochKey, commitment } = body;
    const judgeJob = await this.appService.findResult(judgeId);
    if (!judgeJob) {
      throw new StandardException('fail');
    }
    if (judgeJob.result == 'correct') {
      try {
        attest = await this.appService.attest(epochKey, judgeJob.question.id, commitment)
      } catch (e) {
        //TODO: show reverted error
        console.log(e)
        attest = true
      }

    }
    return {
      status: judgeJob.status,
      passCount: judgeJob.passCount,
      failCount: judgeJob.failCount,
      result: judgeJob.result,
      attest: attest
    };
  }

  @Post('userSignUp')
  async userSignUp(@Body() body: UserSignUpDto) {
    const { publicSignals, proof } = body;
    const result = await this.appService.userSignUp(publicSignals, proof);
    return {
      result
    }
  }

  @Post('userStateTransition')
  async userStateTransition(@Body() body: UserStateTransitionDto) {

    const { publicSignals, proof } = body;
    const result = await this.appService.userStateTransition({
      publicSignals, proof
    });
    return {
      result
    }
  }

  @Post('sealEpoch')
  async sealEpoch(@Body() body: SealEpochDto) {

    const { epoch, publicSignals, proof } = body;
    const result = await this.appService.sealEpoch({
      epoch, publicSignals, proof
    });
    return {
      result
    }
  }

  @Post('createApplication')
  async createApplication(@Body() body: ApplyDto) {

    const {
      secret,
      jobIdx,
      publicSignals,
      proof } = body;
    const result = await this.appService.createApplication({
      secret,
      jobIdx, publicSignals, proof
    });
    return {
      result
    }
  }
}
