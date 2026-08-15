import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
