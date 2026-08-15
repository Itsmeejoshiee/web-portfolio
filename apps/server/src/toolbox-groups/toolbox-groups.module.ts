import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { ToolboxGroupsController } from './toolbox-groups.controller';
import { ToolboxGroupsService } from './toolbox-groups.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [ToolboxGroupsController],
  providers: [ToolboxGroupsService],
})
export class ToolboxGroupsModule {}
