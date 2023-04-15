import { IsArray } from 'class-validator';
import { BigNumberish } from '@ethersproject/bignumber'

export class UserSignUpDto {
    @IsArray()
    publicSignals!: BigNumberish[];
    proof!: BigNumberish[];
  }