import { ApiProperty } from '@nestjs/swagger';

export class BaseError {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}
