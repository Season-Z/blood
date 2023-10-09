import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseProjectDto {
  @ApiProperty({
    description: '工程名称',
  })
  @IsNotEmpty()
  readonly projectName: string;

  @ApiProperty({
    description: '工程标识',
  })
  @IsNotEmpty()
  readonly projectId: string;
}

/** 工程类型枚举 */
export enum ProjectTypeEnum {
  WEB = 'web',
  WE_CHAT = 'wechat',
}
