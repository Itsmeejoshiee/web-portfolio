import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';

@Module({
  imports: [DbModule, AuthModule, ProjectsModule, BlogPostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
