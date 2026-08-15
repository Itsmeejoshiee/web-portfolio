import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { SiteSectionsController } from './site-sections.controller';
import { SiteSectionsService } from './site-sections.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [SiteSectionsController],
  providers: [SiteSectionsService],
})
export class SiteSectionsModule {}
