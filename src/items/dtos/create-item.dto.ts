import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateItemDto {
  @IsInt()
  reportId: number;

  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;
}