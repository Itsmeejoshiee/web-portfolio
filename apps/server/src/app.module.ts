import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [DbModule, AuthModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
