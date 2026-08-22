import { Module } from '@nestjs/common';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [JwtSessionModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
