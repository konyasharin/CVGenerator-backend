import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseError, BaseResponse } from '@common/responses';
import { UserError } from '../enums/user-error.enum';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'example@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ReturnUserDto extends OmitType(UserDto, ['password']) {}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  public static Response = BaseResponse(ReturnUserDto, BaseError(UserError));
}
