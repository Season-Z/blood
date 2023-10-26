import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { ProjectModule } from '../project/project.module';
import { ProjectEntity } from '../project/project.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    ProjectModule,
    UserModule,
  ],
  providers: [BuildService],
  controllers: [BuildController],
  exports: [BuildService],
})
export class BuildModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/build/app', method: RequestMethod.POST });
  }
}
