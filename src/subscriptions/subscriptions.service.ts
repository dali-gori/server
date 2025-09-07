import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
    constructor() {}

    // async createCheckoutSession(priceId: string, email: string)
    // {
    //   const session = await this.stripe.checkout.sessions.create({
    //       mode: 'subscription',
    //       line_items: [{ price: priceId, quantity: 1 }],
    //       customer_email: email,
    //       success_url: "https://example.com/success",
    //       cancel_url: "https://example.com/cancel",
    //       allow_promotion_codes: true,
    //       billing_address_collection: 'auto',
    //   }); 

    //   return { url: session.url };
    // }

    // async createPortalSession(customerId: string) {
    //     const portal = await this.stripe.billingPortal.sessions.create({
    //       customer: customerId,
    //       return_url: `${process.env.FRONTEND_URL}/account`,
    //     });
    //     return { url: portal.url };
    //   }
}
