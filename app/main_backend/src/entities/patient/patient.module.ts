import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { PatientController } from './patient.controller';

import { patientProviders } from './patient.providers';

import { PatientService } from './patient.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [PatientController],
    providers: [...patientProviders, PatientService],
    exports: [PatientService],
})
export class PatientModule {}
