import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { JwtSessionModule } from './jwt-session.module';

@Module({
  imports: [PassportModule, JwtSessionModule],
  controllers: [AuthController],
  providers: [GithubStrategy],
  exports: [JwtSessionModule],
})
export class AuthModule {}
