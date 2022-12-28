import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { DisciplineRepository } from './discipline.repository';

import { DisciplineController } from './discipline.controller';

import { DisciplineService } from './discipline.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([DisciplineRepository, UserRepository])],
    controllers: [DisciplineController],
    providers: [DisciplineService],
    exports: [DisciplineService],
})
export class DisciplineModule {}
