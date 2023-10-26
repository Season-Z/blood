import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  JoinTable,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import * as argon2 from 'argon2';
import { ProjectEntity } from '@modules/project/project.entity';
import { BaseEntity } from '@modules/base/base.entity';
import { ArticleEntity } from '@modules/article/article.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '密码',
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => ProjectEntity, (project) => project.user, {
    cascade: true,
  })
  projects: ProjectEntity[];

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
