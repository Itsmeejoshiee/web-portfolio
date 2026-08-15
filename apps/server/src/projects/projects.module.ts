import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
