import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @ApiProperty()
  //@IsLongitude()
  longitude: string;

  @ApiProperty()
  //@IsLatitude()
  latitude: string;
}
