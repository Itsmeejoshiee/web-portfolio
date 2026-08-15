import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { TemplatesModule } from './templates/templates.module';
import { ExperienceModule } from './experience/experience.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ToolboxGroupsModule } from './toolbox-groups/toolbox-groups.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    ProjectsModule,
    BlogPostsModule,
    TemplatesModule,
    ExperienceModule,
    AchievementsModule,
    ToolboxGroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
