import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { EssayResultRepository } from './essay-result.repository';

import { EssayResultController } from './essay-result.controller';

import { EssayResultService } from './essay-result.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([EssayResultRepository, UserRepository])],
    controllers: [EssayResultController],
    providers: [EssayResultService],
    exports: [EssayResultService],
})
export class EssayResultModule {}
