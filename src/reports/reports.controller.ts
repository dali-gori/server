import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { NewReportDto } from './dtos/newReportModel.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard, RolesGuard } from 'src/auth/roles.guard';
import { UpdateReportDto } from './dtos/updateReportModel.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get()
    async getReports() {
        return this.reportsService.getAllReports();
    }

    @Get(':id')
    async getOneReport(@Param("id") id: number) {
        return this.reportsService.getReportById(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Post()
    async createReport(@Body() dto: NewReportDto, @CurrentUser() user: { userId: number; role: number }) {
        return this.reportsService.create(dto, user.userId);
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Patch(':id')
    async updateReport(
      @Param('id') id: number,
      @Body() body: UpdateReportDto,
    ) {
      return this.reportsService.updateReport(id, body);
    }

    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Patch(':id/status')
    async updateReportStatus(
      @Param('id') id: number,
      @Body('statusId') statusId: number,
    ) {
      if (!statusId) {
        throw new Error('statusId is required');
      }
      return this.reportsService.updateReportStatus(id, statusId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Patch(':id/location')
    async updateReportLocationAndRadius(
      @Param('id') id: number,
      @Body() body: { geo_x: number; geo_y: number; radius: number },
    ) {
      if (
        body.geo_x === undefined ||
        body.geo_y === undefined ||
        body.radius === undefined
      ) {
        throw new Error('geo_x, geo_y, and radius are required');
      }
      return this.reportsService.updateReportLocationAndRadius(id, body.geo_x, body.geo_y, body.radius);
    }

    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Delete(':id')
    async deleteReport(
      @Param('id') id: number,
      @CurrentUser() user: { userId: number; role: number }
    ) {
      var report = await this.reportsService.delete(id);
      return report;
      }
}
