import { UserDecorator } from '@decorator/user.decorator';
import {
  Body,
  Controller,
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
import { BuildDto } from './build.dto';
import { BuildService } from './build.service';

@ApiBearerAuth()
@ApiTags('build')
@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @ApiOperation({ summary: '构建应用' })
  @ApiResponse({ status: 200, description: '返回数据' })
  @Post('app')
  async projectBuild(@Body() buildData: BuildDto) {
    return this.buildService.buildApp(buildData);
  }
}
