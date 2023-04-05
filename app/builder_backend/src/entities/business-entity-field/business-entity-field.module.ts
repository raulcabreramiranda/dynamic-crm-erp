import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { BusinessEntityFieldController } from './business-entity-field.controller';

import { businessEntityFieldProviders } from './business-entity-field.providers';

import { BusinessEntityFieldService } from './business-entity-field.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [BusinessEntityFieldController],
    providers: [...businessEntityFieldProviders, BusinessEntityFieldService],
    exports: [BusinessEntityFieldService],
})
export class BusinessEntityFieldModule {}
