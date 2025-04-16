import { ApiProperty } from '@nestjs/swagger';

export class BaseError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
