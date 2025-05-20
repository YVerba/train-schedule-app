import { IsString, IsDateString, IsDefined } from 'class-validator';

export class TrainDto {
  @IsDefined()
  @IsString()
  from: string;

  @IsDefined()
  @IsString()
  to: string;

  @IsDefined()
  @IsDateString()
  departureTime: string;

  @IsDefined()
  @IsDateString()
  arrivalTime: string;
}
