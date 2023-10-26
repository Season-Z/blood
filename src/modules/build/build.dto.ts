import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BuildDto {
  @ApiProperty({
    description: 'schema',
  })
  @IsNotEmpty()
  readonly schema: Record<string, any>;

  @ApiProperty({
    description: '工程标识',
  })
  @IsNotEmpty()
  readonly projectId: string;
}
