import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
