import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({ required: true, example: 'dino' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ required: true, example: 'cat' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false, example: 'Retriever' })
  @IsString()
  @IsOptional()
  poroda: string;

  @ApiProperty({ required: true, example: 'male or female' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  aggressive: boolean;
}
