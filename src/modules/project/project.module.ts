import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserModule } from '@modules/user/user.module';
import { UserEntity } from '@modules/user/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserEntity]), UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'project', method: RequestMethod.GET },
        { path: 'project', method: RequestMethod.PUT },
      );
  }
}
