import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

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

export class ReturnUserDto extends OmitType(UserDto, ['password']) {}
