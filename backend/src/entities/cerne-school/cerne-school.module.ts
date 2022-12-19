import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { CerneSchoolRepository } from './cerne-school.repository';

import { CerneSchoolController } from './cerne-school.controller';

import { CerneSchoolService } from './cerne-school.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CerneSchoolRepository, UserRepository])],
    controllers: [CerneSchoolController],
    providers: [CerneSchoolService],
    exports: [CerneSchoolService],
})
export class CerneSchoolModule {}
