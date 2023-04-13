import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { CompanyController } from './company.controller';

import { companyProviders } from './company.providers';

import { CompanyService } from './company.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CompanyController],
    providers: [...companyProviders, CompanyService],
    exports: [CompanyService],
})
export class CompanyModule {}
