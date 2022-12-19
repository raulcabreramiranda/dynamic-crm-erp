import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { MasterTeacherRepository } from './master-teacher.repository';

import { MasterTeacherController } from './master-teacher.controller';

import { MasterTeacherService } from './master-teacher.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([MasterTeacherRepository, UserRepository])],
    controllers: [MasterTeacherController],
    providers: [MasterTeacherService],
    exports: [MasterTeacherService],
})
export class MasterTeacherModule {}
