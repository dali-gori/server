import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSavedLocationDto {
  @IsString({ message: 'Името трябва да бъде низ.' })
  @IsNotEmpty({ message: 'Името е задължително.' })
  name: string;

  @IsNumber({}, { message: 'Географската дължина трябва да бъде число.' })
  @IsNotEmpty({ message: 'Географската дължина е задължителна.' })
  geo_x: number;

  @IsNumber({}, { message: 'Географската ширина трябва да бъде число.' })
  @IsNotEmpty({ message: 'Географската ширина е задължителна.' })
  geo_y: number;
}