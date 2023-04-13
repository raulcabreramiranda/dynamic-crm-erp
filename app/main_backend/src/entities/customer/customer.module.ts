import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { CustomerController } from './customer.controller';

import { customerProviders } from './customer.providers';

import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CustomerController],
    providers: [...customerProviders, CustomerService],
    exports: [CustomerService],
})
export class CustomerModule {}
