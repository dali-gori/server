import { Module } from '@nestjs/common';
import Stripe from 'stripe';

@Module({
    providers: [
      {
        provide: 'STRIPE',
        useFactory: () =>
          new Stripe(process.env.STRIPE_SECRET_KEY!),
      },
    ],
    exports: ['STRIPE'],
  })
  export class StripeModule {}