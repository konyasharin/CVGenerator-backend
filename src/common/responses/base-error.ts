import { ApiProperty } from '@nestjs/swagger';
import { mixin } from '@nestjs/common';

export const BASE_ERROR_VALUE = 'BASE_ERROR';

export const BaseError = (errorType: Record<string, string> = {}) => {
  class BaseErrorModel {
    @ApiProperty({
      example: ['Something went wrong'],
    })
    message: string[];

    @ApiProperty({
      example: BASE_ERROR_VALUE,
      enum: [...Object.values(errorType), BASE_ERROR_VALUE],
    })
    error: string;

    @ApiProperty({
      example: 400,
    })
    statusCode: number;
  }

  return mixin(BaseErrorModel);
};
