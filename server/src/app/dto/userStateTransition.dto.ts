import { IsArray } from 'class-validator';
import { BigNumberish } from '@ethersproject/bignumber'

export class UserStateTransitionDto {
    epoch!: BigNumberish;
    @IsArray()
    publicSignals!: BigNumberish[];
    @IsArray()
    proof!: BigNumberish[];
    @IsArray()
    orderedTreePublicSignals!: BigNumberish[];
    @IsArray()
    orderedTreeProof!: BigNumberish[];
  }