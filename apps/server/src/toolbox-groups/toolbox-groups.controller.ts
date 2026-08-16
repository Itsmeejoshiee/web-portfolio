import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodBodyValidationPipe } from '../common/zod-body-validation.pipe';
import { ToolboxGroupsService } from './toolbox-groups.service';
import { updateToolboxGroupSchema, UpdateToolboxGroupDto } from './toolbox-groups.dto';

@Controller('toolbox-groups')
export class ToolboxGroupsController {
  constructor(private readonly toolboxGroupsService: ToolboxGroupsService) {}

  @Get()
  findAll() {
    return this.toolboxGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.toolboxGroupsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(updateToolboxGroupSchema))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateToolboxGroupDto) {
    return this.toolboxGroupsService.update(id, dto);
  }
}
