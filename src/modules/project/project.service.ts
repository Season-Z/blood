import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { BaseProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find();
  }

  async create(dto: BaseProjectDto): Promise<ProjectEntity> {
    const { projectName, projectId } = dto;

    console.log('dto', dto);

    const search = await getRepository(ProjectEntity)
      .createQueryBuilder('project')
      .where('project.projectName = :projectName', { projectName });

    const project = await search.getOne();

    if (project) {
      throw new HttpException(
        {
          message: '输入值有误',
          error: '已经存在该工程',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = { ...dto, projectCode: `PR${new Date()}` };

    return this.projectRepository.save(data);
  }
}
