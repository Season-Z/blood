import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { BaseProjectDto } from './project.dto';
import { UserEntity } from '@modules/user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find();
  }

  async create(userId: number, dto: BaseProjectDto): Promise<ProjectEntity> {
    const { projectName, projectId } = dto;

    const search = await getRepository(ProjectEntity)
      .createQueryBuilder('project')
      .where('project.projectId = :projectId', { projectId })
      .orWhere('project.projectName = :projectName', { projectName });

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

    // TODO 一对多的数据查询更新
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.projects = user.projects || [];
    user.projects.push(project);

    await this.userRepository.save(user);

    const data = { ...dto, projectCode: `PR${new Date().getTime()}` };

    return this.projectRepository.save(data);
  }
}
