import { UserEntity } from '@modules/user/user.entity';
import { BaseEntity } from '@modules/base/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectTypeEnum } from './project.dto';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '工程编码',
    name: 'project_code',
  })
  projectCode: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    comment: '工程标识',
    name: 'project_id',
  })
  projectId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '工程名称',
    name: 'project_name',
  })
  projectName: string;

  @Column({
    type: 'enum',
    enum: ProjectTypeEnum,
    comment: '工程类型',
    name: 'project_type',
  })
  projectType: string;

  @ManyToOne(() => UserEntity, (user) => user.username)
  user: UserEntity;
}
