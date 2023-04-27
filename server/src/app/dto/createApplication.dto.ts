import { IsArray } from 'class-validator';
import { BigNumberish } from '@ethersproject/bignumber'

export class ApplyDto {
    jobIdx!: BigNumberish;
    secret!: BigNumberish;
    @IsArray()
    publicSignals!: BigNumberish[];
    @IsArray()
    proof!: BigNumberish[];
  }