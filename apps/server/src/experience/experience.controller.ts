import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodBodyValidationPipe } from '../common/zod-body-validation.pipe';
import { ExperienceService } from './experience.service';
import { createExperienceSchema, updateExperienceSchema, CreateExperienceDto, UpdateExperienceDto } from './experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.experienceService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(createExperienceSchema))
  create(@Body() dto: CreateExperienceDto) {
    return this.experienceService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(updateExperienceSchema))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.experienceService.remove(id);
  }
}
