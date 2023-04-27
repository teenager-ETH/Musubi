import { IsArray } from 'class-validator';
import { BigNumberish } from '@ethersproject/bignumber'

export class UserStateTransitionDto {
    @IsArray()
    publicSignals!: BigNumberish[];
    @IsArray()
    proof!: BigNumberish[];
  }