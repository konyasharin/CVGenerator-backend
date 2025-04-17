import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response = <T extends Type>(responseModel: T) => {
  return applyDecorators(ApiResponse({ type: responseModel }));
};
