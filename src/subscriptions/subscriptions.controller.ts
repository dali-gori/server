import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import Stripe from 'stripe';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptions: SubscriptionsService) {}

    @UseGuards(JwtAuthGuard, RoleGuard(1))
    @Post()
    async createReport(
        @Body() priceId: string,
        @CurrentUser() user: { userId: number; email: string; role: number }) {
            return this.subscriptions.createCheckoutSession(priceId, user.email);
    }
}
