import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Controller('webhook')
export class WebhookController {
    constructor() {}

  // @Post('webhook')
  // async handleWebhook(
  //   @Req() req: Request,
  //    @Res() res: Response) {
  //   const sig = req.headers['stripe-signature'];
  //   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  //   let event: Stripe.Event;
  //   try {
  //     event = this.stripe.webhooks.constructEvent(
  //       (req as any).body,  // raw body
  //       sig as string,
  //       endpointSecret,
  //     );
  //   } catch (err) {
  //     return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  //   }

  //   switch (event.type) {
  //     case 'checkout.session.completed': {
  //       const session = event.data.object as Stripe.Checkout.Session;
  //       const customerId = session.customer as string;        // cus_...
  //       const subscriptionId = session.subscription as string; // sub_...

  //       const userId =
  //           (session.client_reference_id as string) ??
  //           (session.metadata?.userId as string);

  //       await this.users.saveStripeIds(userId, {
  //           stripeCustomerId: customerId,
  //           stripeSubscriptionId: subscriptionId,
  //         });
  //       break;
  //     }
  //     case 'invoice.paid':
  //       // Subscription renewed successfully
  //       break;
  //     case 'invoice.payment_failed':
  //       // Payment failed — handle grace period / notify user
  //       break;
  //   }

  //   res.json({ received: true });
  }
