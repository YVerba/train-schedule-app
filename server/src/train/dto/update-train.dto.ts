import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateTrainDto {
  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsDateString()
  departureTime?: string;

  @IsOptional()
  @IsDateString()
  arrivalTime?: string;
}
