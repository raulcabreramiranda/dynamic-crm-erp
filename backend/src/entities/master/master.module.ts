import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { MasterRepository } from './master.repository';

import { MasterController } from './master.controller';

import { MasterService } from './master.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([MasterRepository, UserRepository])],
    controllers: [MasterController],
    providers: [MasterService],
    exports: [MasterService],
})
export class MasterModule {}
