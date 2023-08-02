import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ required: true, example: 'Uriy' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ required: true, example: 'user@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'User1111' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
