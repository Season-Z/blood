import { UserEntity } from '@modules/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProjectTypeEnum } from './project.dto';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '工程编码',
  })
  projectCode: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    comment: '工程标识',
  })
  projectId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '工程名称',
  })
  projectName: string;

  @Column({
    type: 'enum',
    enum: ProjectTypeEnum,
    comment: '工程类型',
  })
  projectType: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.username)
  user: UserEntity;
}
