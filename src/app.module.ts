import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {HomeMapModule} from "./home-map/home-map.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const url = process.env.DATABASE_PUBLIC_URL!;
        // If your DATABASE_URL already contains sslmode=require, TypeORM will honor it.
        // Some environments still need an explicit ssl object:
        const useExplicitSSL = !url.includes('sslmode=require');
        return {
          type: 'postgres',
          url,
          autoLoadEntities: true,      // or list entities: [User, Post, ...]
          synchronize: false,          // true for quick dev only; use migrations in real projects
          ssl: useExplicitSSL
              ? { rejectUnauthorized: false } // Railway uses trusted certs; false is a pragmatic default
              : undefined,
        };
      },
    }),
    HomeMapModule
  ],
})
export class AppModule {}
