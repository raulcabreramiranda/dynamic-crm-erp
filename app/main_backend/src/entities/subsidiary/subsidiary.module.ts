import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { SubsidiaryController } from './subsidiary.controller';

import { subsidiaryProviders } from './subsidiary.providers';

import { SubsidiaryService } from './subsidiary.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [SubsidiaryController],
    providers: [...subsidiaryProviders, SubsidiaryService],
    exports: [SubsidiaryService],
})
export class SubsidiaryModule {}
