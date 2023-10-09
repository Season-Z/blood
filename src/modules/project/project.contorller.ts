import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { BaseProjectDto } from './project.dto';

@ApiBearerAuth()
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '获取所有工程数据' })
  @ApiResponse({ status: 200, description: '返回数据' })
  @ApiResponse({ status: 403, description: '无权限' })
  @Get()
  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectService.findAll();
  }

  @ApiOperation({ summary: '创建新工程' })
  @ApiResponse({ status: 200, description: '返回数据' })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() projectData: BaseProjectDto) {
    return this.projectService.create(projectData);
  }
}
