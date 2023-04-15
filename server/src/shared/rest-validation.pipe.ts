import {
  ArgumentMetadata,
  ValidationPipe as NestValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

import { StandardException } from './standard.exception';

export class RestValidationPipe extends NestValidationPipe {
  constructor(options: ValidationPipeOptions) {
    super({
      exceptionFactory() {
        return new StandardException({
          errorCode: 1,
          errorMsg: 'The parameter is invalid',
        });
      },
      ...options,
    });
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      // body的通用格式
      return super.transform(value?.data || {}, metadata);
    }
    return super.transform(value, metadata);
  }
}
