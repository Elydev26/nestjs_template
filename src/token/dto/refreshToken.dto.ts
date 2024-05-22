import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty()
  expiredToken: string;
  @ApiProperty()
  refreshToken: string;
}
