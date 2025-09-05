import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_PUBLIC_URL,
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['src/migrations/*.{ts,js}'],
    ssl: process.env.DATABASE_PUBLIC_URL?.includes('sslmode=require')
        ? undefined
        : { rejectUnauthorized: false },
});