import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import cookieParser from 'cookie-parser';
import { JwtSessionModule } from '../auth/jwt-session.module';
import { SESSION_COOKIE_NAME } from '../auth/jwt-auth.guard';

export async function createTestApp(imports: Array<new (...args: never[]) => unknown>) {
  const moduleRef = await Test.createTestingModule({
    imports: [JwtSessionModule, ...imports],
  }).compile();

  const app: INestApplication = moduleRef.createNestApplication();
  app.use(cookieParser());
  await app.init();

  const jwtService = moduleRef.get(JwtService);
  const adminCookie = `${SESSION_COOKIE_NAME}=${jwtService.sign({ githubId: 'test-owner' })}`;

  return { app, moduleRef, adminCookie };
}
