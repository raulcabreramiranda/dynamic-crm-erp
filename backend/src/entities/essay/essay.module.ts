import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { EssayRepository } from './essay.repository';

import { EssayController } from './essay.controller';

import { EssayService } from './essay.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([EssayRepository, UserRepository])],
    controllers: [EssayController],
    providers: [EssayService],
    exports: [EssayService],
})
export class EssayModule {}
