import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { OLDCerneSchoolRepository } from './o-l-d-cerne-school.repository';

import { OLDCerneSchoolController } from './o-l-d-cerne-school.controller';

import { OLDCerneSchoolService } from './o-l-d-cerne-school.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([OLDCerneSchoolRepository, UserRepository])],
    controllers: [OLDCerneSchoolController],
    providers: [OLDCerneSchoolService],
    exports: [OLDCerneSchoolService],
})
export class OLDCerneSchoolModule {}
