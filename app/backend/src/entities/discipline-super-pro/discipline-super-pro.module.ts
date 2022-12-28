import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { DisciplineSuperProRepository } from './discipline-super-pro.repository';

import { DisciplineSuperProController } from './discipline-super-pro.controller';

import { DisciplineSuperProService } from './discipline-super-pro.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([DisciplineSuperProRepository, UserRepository])],
    controllers: [DisciplineSuperProController],
    providers: [DisciplineSuperProService],
    exports: [DisciplineSuperProService],
})
export class DisciplineSuperProModule {}
