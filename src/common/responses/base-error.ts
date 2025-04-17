import { ExceptionType } from '@common/exceptions';
import { ApiProperty } from '@nestjs/swagger';

export type BaseErrorAsType = InstanceType<ReturnType<typeof BaseError>>;

export const BaseError = (errorType: string[] = []) => {
  class BaseErrorDto {
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

  return BaseErrorDto;
};
