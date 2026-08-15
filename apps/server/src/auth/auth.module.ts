import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET — set it in your environment before starting the server.');
}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
