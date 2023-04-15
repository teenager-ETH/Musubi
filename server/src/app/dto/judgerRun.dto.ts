import { IsString } from 'class-validator';

export class JudgerRunDto {
  @IsString()
  questionId!: string;


  @IsString()
  code!: string;
}

export class JudgerResultDto {
  @IsString()
  judgeId!: string;
}
