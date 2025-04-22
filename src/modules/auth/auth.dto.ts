import { ExceptionType } from '@common/exceptions';
import { BaseError, BaseResponse } from '@common/responses';
import { TokenDto } from '@modules/token';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

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
  @MinLength(6)
  password: string;
}

export class ReturnUserDto extends OmitType(UserDto, ['password']) {}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  public static readonly Response = BaseResponse(
    ReturnUserDto,
    BaseError([ExceptionType.ALREADY_EXISTS]),
  );
}

export class LoginDto extends OmitType(UserDto, ['id']) {
  public static readonly Response = BaseResponse(
    TokenDto,
    BaseError([ExceptionType.BAD_REQUEST]),
  );
}
