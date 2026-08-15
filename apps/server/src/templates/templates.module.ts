import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
