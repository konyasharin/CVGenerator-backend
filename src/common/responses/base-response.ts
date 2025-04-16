import { mixin, Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './base-error';

export const createBaseResponse = <
  TDataModel extends Type,
  TErrorModel extends Type<BaseError>,
>(
  dataModel: TDataModel,
  errorModel?: TErrorModel,
) => {
  class BaseResponse {
    @ApiProperty({ type: dataModel, nullable: true })
    data: InstanceType<TDataModel>;

    @ApiProperty({ type: errorModel ?? BaseError, nullable: true })
    error: InstanceType<TErrorModel>;
  }

  return mixin(BaseResponse);
};
