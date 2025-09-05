import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    create(@Body() dto: CreateItemDto) {
        return this.itemsService.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateItemDto) {
        return this.itemsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.remove(id);
    }
}
