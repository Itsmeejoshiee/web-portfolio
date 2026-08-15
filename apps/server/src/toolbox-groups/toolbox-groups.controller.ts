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
import { ToolboxGroupsService } from './toolbox-groups.service';
import {
  createToolboxGroupSchema,
  updateToolboxGroupSchema,
  CreateToolboxGroupDto,
  UpdateToolboxGroupDto,
} from './toolbox-groups.dto';

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

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(createToolboxGroupSchema))
  create(@Body() dto: CreateToolboxGroupDto) {
    return this.toolboxGroupsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodBodyValidationPipe(updateToolboxGroupSchema))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateToolboxGroupDto) {
    return this.toolboxGroupsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.toolboxGroupsService.remove(id);
  }
}
