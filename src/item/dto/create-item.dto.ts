import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;
}

export class GetRestaurantsFilterDto {
  search: string;
  category: string;
}
