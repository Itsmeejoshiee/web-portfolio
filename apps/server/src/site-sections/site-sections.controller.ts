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
import { SiteSectionsService } from './site-sections.service';
import {
  createSiteSectionSchema,
  updateSiteSectionSchema,
  CreateSiteSectionDto,
  UpdateSiteSectionDto,
} from './site-sections.dto';

@Controller('site-sections')
export class SiteSectionsController {
  constructor(private readonly siteSectionsService: SiteSectionsService) {}

  @Get()
  findAll() {
    return this.siteSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.siteSectionsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(createSiteSectionSchema))
  create(@Body() dto: CreateSiteSectionDto) {
    return this.siteSectionsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(updateSiteSectionSchema))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSiteSectionDto) {
    return this.siteSectionsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteSectionsService.remove(id);
  }
}
