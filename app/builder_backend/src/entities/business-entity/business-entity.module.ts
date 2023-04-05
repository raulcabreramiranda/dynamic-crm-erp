import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { BusinessEntityController } from './business-entity.controller';

import { businessEntityProviders } from './business-entity.providers';

import { BusinessEntityService } from './business-entity.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [BusinessEntityController],
    providers: [...businessEntityProviders, BusinessEntityService],
    exports: [BusinessEntityService],
})
export class BusinessEntityModule {}
