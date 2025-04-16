import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { createBaseResponse } from '../../common/responses/base-response';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
export class CreateUserDto extends OmitType(UserDto, ['id']) {}

export class ReturnUserDto extends createBaseResponse(
  OmitType(UserDto, ['password']),
) {}
