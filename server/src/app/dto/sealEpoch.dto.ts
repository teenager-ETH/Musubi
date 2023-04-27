import { IsArray } from 'class-validator';
import { BigNumberish } from '@ethersproject/bignumber'

export class SealEpochDto {
    epoch!: BigNumberish;
    @IsArray()
    publicSignals!: BigNumberish[];
    @IsArray()
    proof!: BigNumberish[];
  }