import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodBodyValidationPipe } from '../common/zod-body-validation.pipe';
import { SiteSectionsService } from './site-sections.service';
import { updateSiteSectionSchema, UpdateSiteSectionDto } from './site-sections.dto';

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(updateSiteSectionSchema))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSiteSectionDto) {
    return this.siteSectionsService.update(id, dto);
  }
}
