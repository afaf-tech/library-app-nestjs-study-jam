import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookLoansModule } from './book-loans/book-loans.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/config/configuration';
import databaseConfig from './common/config/database.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { logger } from './common/middlewares/logger-function.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConnectionOptions } from 'typeorm';
import databaseTestingConfig from './common/config/database-testing.config';
import { CustomValidationPipe } from './common/pipes/validation-input.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig, databaseTestingConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        let options: ConnectionOptions;
        const nodeEnv = process.env.NODE_ENV;

        if (nodeEnv == 'testing') {
          options = configService.get<ConnectionOptions>('databaseTesting');
        } else {
          options = configService.get<ConnectionOptions>('database');
        }

        return options;
      },
      inject: [ConfigService],
    }),
    BooksModule,
    BookLoansModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware)
  //   // .forRoutes('v1/books');
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('v1/books');
  }
}
