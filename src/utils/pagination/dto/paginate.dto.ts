import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  searchTerm: string;
}

export class ElasticSearchPaginationDto {
  @ApiProperty()
  size: number;
  @ApiProperty()
  from: number;
  @ApiProperty()
  searchTerm: string;
}
