import { IsEmail, IsJWT, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseError, BaseResponse } from '@common/responses';
import { ExceptionType } from '@common/exceptions';

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

export class JwtDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsJWT()
  refreshToken: string;
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
    JwtDto,

  );
}
