import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { AttributeModule } from './attribute/attribute.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import dbConfig from './config/db.config';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductLineModule } from './product-line/product-line.module';
import { ProductModule } from './product/product.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

import { BranchModule } from './branch/branch.module';
import { ChartOfAccountModule } from './chart-of-account/chart-of-account.module';
import { ExpenseModule } from './expense/expense.module';
import { InventoryBatchModule } from './inventory-batch/inventory-batch.module';
import { InventoryMovementModule } from './inventory-movement/inventory-movement.module';
import { InventoryModule } from './inventory/inventory.module';
import { JournalModule } from './journal/journal.module';
import { TransactionModule } from './transaction/transaction.module';

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
    BranchModule,

    CategoryModule,

    BrandModule,

    ProductModule,

    ProductLineModule,

    AttributeModule,

    AttributeValueModule,

    ProductImageModule,

    ChartOfAccountModule,

    TransactionModule,

    JournalModule,

    ExpenseModule,

    InventoryMovementModule,

    InventoryModule,

    InventoryBatchModule,
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
