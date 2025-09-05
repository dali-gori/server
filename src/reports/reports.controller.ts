import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Post()
    async createReport(@Body() dto: NewReportDto, @CurrentUser() user: { userId: number }) {
        return this.reportsService.createNewReport(dto, user.userId);
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard(2))
    @Patch(':id')
    async updateReport(
      @Param('id') id: number,
      @Body() body: UpdateReportDto,
    ) {
      return this.reportsService.updateReport(id, body);
    }
}
