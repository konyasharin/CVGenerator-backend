import { ExceptionType } from '@common/exceptions';
import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export type BaseErrorAsType = InstanceType<ReturnType<typeof BaseError>>;

export const BaseError = (errorType: string[] = []) => {
  class BaseErrorModel {
    @ApiProperty({
      example: ['Something went wrong'],
    })
    message: string[];

    @ApiProperty({
      example: ExceptionType.BASE,
      enum: [...errorType, ExceptionType.BASE],
    })
    type: string;

    @ApiProperty({
      example: 400,
    })
    statusCode: number;
  }

  return mixin(BaseErrorModel);
};
