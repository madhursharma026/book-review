import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-ioredis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    // Redis Cache Configuration
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60 * 5, // optional, default TTL 5 minutes
    }),

    // TypeORM MySQL Configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'book_review',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/**/*.migrations{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false, // using migrations
    }),

    BooksModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
