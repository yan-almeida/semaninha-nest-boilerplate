import { ApiProperty } from '@nestjs/swagger';

export class AppMessage {
  @ApiProperty()
  message: string[];
  @ApiProperty()
  details?: string;
}
