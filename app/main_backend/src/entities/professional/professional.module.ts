import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { ProfessionalController } from './professional.controller';

import { professionalProviders } from './professional.providers';

import { ProfessionalService } from './professional.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [ProfessionalController],
    providers: [...professionalProviders, ProfessionalService],
    exports: [ProfessionalService],
})
export class ProfessionalModule {}
