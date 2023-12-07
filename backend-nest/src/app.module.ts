import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { ClientsModule } from './clients/clients.module';
import { SubContaModule } from './subconta/subconta.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
@Module({
 
  imports: [PaymentsModule, TypeOrmModule.forRoot(config),ClientsModule,SubContaModule,UserModule,AuthModule,BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
