import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { ProductLineModule } from './product-line/product-line.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChartOfAccountingModule } from './chart-of-accounting/chart-of-accounting.module';
import { ChartOfAccountModule } from './chart-of-account/chart-of-account.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from the 'uploads' folder
      serveRoot: '/uploads', // URL path
    }),
    UserModule,
    AuthModule,
    SessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),

    CategoryModule,

    BrandModule,

    ProductModule,

    ProductLineModule,

    AttributeModule,

    AttributeValueModule,

    ProductImageModule,

    ChartOfAccountingModule,

    ChartOfAccountModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
