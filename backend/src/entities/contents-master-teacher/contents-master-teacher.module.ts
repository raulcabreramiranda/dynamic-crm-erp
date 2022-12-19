import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ContentsMasterTeacherRepository } from './contents-master-teacher.repository';

import { ContentsMasterTeacherController } from './contents-master-teacher.controller';

import { ContentsMasterTeacherService } from './contents-master-teacher.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ContentsMasterTeacherRepository, UserRepository])],
    controllers: [ContentsMasterTeacherController],
    providers: [ContentsMasterTeacherService],
    exports: [ContentsMasterTeacherService],
})
export class ContentsMasterTeacherModule {}
