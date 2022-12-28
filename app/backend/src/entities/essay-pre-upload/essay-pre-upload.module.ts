import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { EssayPreUploadRepository } from './essay-pre-upload.repository';

import { EssayPreUploadController } from './essay-pre-upload.controller';

import { EssayPreUploadService } from './essay-pre-upload.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([EssayPreUploadRepository, UserRepository])],
    controllers: [EssayPreUploadController],
    providers: [EssayPreUploadService],
    exports: [EssayPreUploadService],
})
export class EssayPreUploadModule {}
