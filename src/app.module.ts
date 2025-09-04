import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FiresModule } from './fires/fires.module';
import { Fire } from './fires/fire.entity';
import { HomeMapModule } from './home-map/home-map.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // false in prod to avoid accidental schema changes
      ssl: { rejectUnauthorized: false }, // needed for Railway
    }),
    FiresModule,
    HomeMapModule,
  ],
})
export class AppModule {}
