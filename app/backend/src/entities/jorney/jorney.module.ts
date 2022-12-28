import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyRepository } from './jorney.repository';

import { JorneyController } from './jorney.controller';

import { JorneyService } from './jorney.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyRepository, UserRepository])],
    controllers: [JorneyController],
    providers: [JorneyService],
    exports: [JorneyService],
})
export class JorneyModule {}
