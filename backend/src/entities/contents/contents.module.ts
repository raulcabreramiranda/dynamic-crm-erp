import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ContentsRepository } from './contents.repository';

import { ContentsController } from './contents.controller';

import { ContentsService } from './contents.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ContentsRepository, UserRepository])],
    controllers: [ContentsController],
    providers: [ContentsService],
    exports: [ContentsService],
})
export class ContentsModule {}
