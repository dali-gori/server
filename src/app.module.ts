(global as any).crypto = (global as any).crypto ?? require('crypto').webcrypto;

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {HomeMapModule} from "./home-map/home-map.module";
import { ReportsModule } from './reports/reports.module';
import {AuthModule} from "./auth/auth.module";
import { ItemsModule } from './items/items.module';
import { ItemDonationsModule } from './item-donations/item-donations.module';
import { SavedLocationsModule } from './saved-locations/saved-locations.module';
// import { SubscriptionsModule } from './subscriptions/subscriptions.module';
// import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const url =
            process.env.DATABASE_URL ??
            process.env.DATABASE_PUBLIC_URL ??
            process.env.POSTGRES_URL;

        if (!url) {
          throw new Error(
              'Database URL is not set. Expected env var DATABASE_URL (or DATABASE_PUBLIC_URL/POSTGRES_URL).'
          );
        }

        const hasSslModeRequire = /sslmode=require/i.test(url);
        const useExplicitSSL =
            process.env.DATABASE_SSL === 'true' || !hasSslModeRequire;
        return {
          type: 'postgres',
          url,
          autoLoadEntities: true,
          synchronize: false,
          ssl: useExplicitSSL
              ? { rejectUnauthorized: false }
              : undefined,
        };
      },
    }),
    AuthModule,
    HomeMapModule,
    ReportsModule,
    ItemsModule,
    ItemDonationsModule,
    SavedLocationsModule,
    // SubscriptionsModule,
    // StripeModule
  ],
})
export class AppModule {}
