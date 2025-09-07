import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { WebhookController } from './webhook.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [StripeModule,
    UsersModule
  ],
  controllers: [SubscriptionsController, WebhookController],
  providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
