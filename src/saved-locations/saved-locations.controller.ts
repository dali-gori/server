import { Controller, Get, Post, Delete, Body, Param, Req, ParseIntPipe } from '@nestjs/common';
import { SavedLocationsService } from './saved-locations.service';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common/decorators/core';
import { CreateSavedLocationDto } from './dtos/create-save-location.dto';

@Controller('saved-locations')
export class SavedLocationsController {
  constructor(private readonly savedLocationsService: SavedLocationsService) {}

  // Get all locations for the current user
  @UseGuards(JwtAuthGuard, RoleGuard(1))
  @Get()
  async getAll(@CurrentUser() user: { userId: number; role: number }) {
    const userId = user.userId;
    return this.savedLocationsService.findAllByUser(userId);
  }

  // Create a new saved location
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(1))
  async create(@CurrentUser() user: { userId: number; role: number }, @Body() body: CreateSavedLocationDto) {
    console.log(user);
    const userId = user.userId;
    return this.savedLocationsService.create(userId, body);
  }

  // Delete a saved location by ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(1))
  async delete(@CurrentUser() user: { userId: number; role: number }, @Param('id', ParseIntPipe) id: number) {
    const userId = user.userId;
    await this.savedLocationsService.delete(userId, id);
    return { success: true };
  }
}
