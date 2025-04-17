import { mixin, Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './base-error';

export const BaseResponse = <
  TDataModel extends Type,
  TErrorModel extends ReturnType<typeof BaseError>,
>(
  dataModel: TDataModel,
  errorModel?: TErrorModel,
) => {
  class BaseResponseModel {
    @ApiProperty({ type: dataModel, nullable: true })
    data: InstanceType<TDataModel>;

    @ApiProperty({ type: errorModel ?? BaseError(), nullable: true })
    error: InstanceType<TErrorModel>;
  }

  return mixin(BaseResponseModel);
};
