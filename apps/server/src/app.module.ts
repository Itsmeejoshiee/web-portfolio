import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [DbModule, AuthModule, ProjectsModule, BlogPostsModule, TemplatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
