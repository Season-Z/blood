import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { writeFileSync } from 'fs-extra';
import { ProjectEntity } from '../project/project.entity';
import { BuildDto } from './build.dto';
import path from 'node:path';
import { execSync } from 'node:child_process';

@Injectable()
export class BuildService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async buildApp(dto: BuildDto) {
    const { schema, projectId } = dto;

    const project = await this.projectRepository.findOne({
      where: { projectId },
      relations: ['user'],
    });

    try {
      // 生成project信息
      const projectJson = {
        type: project.projectType,
        name: project.projectName,
        version: '1.0.0',
        projectCode: project.projectCode,
        appId: project.projectId,
        launcherRouter: schema.name,
      };
      const rootPath = path.resolve(process.cwd(), `./app-builder`);
      const projectPath = path.resolve(rootPath, './build-data/project.json');

      writeFileSync(projectPath, JSON.stringify(projectJson));

      // 生成单页面page信息
      const pagePath = path.resolve(
        rootPath,
        `./build-data/page.${project.projectCode}.json`,
      );
      writeFileSync(pagePath, JSON.stringify(schema));

      const shPath = path.resolve(rootPath, `./build.sh`);

      execSync(`cd ${rootPath} && sh ${shPath}`);
    } catch (error) {
      throw new HttpException(
        {
          message: error,
          error: '构建失败',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // TODO 后面改为cdn地址
    return { success: true };
  }
}
