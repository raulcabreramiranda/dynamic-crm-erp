import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { EssayResultCommentRepository } from './essay-result-comment.repository';

import { EssayResultCommentController } from './essay-result-comment.controller';

import { EssayResultCommentService } from './essay-result-comment.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([EssayResultCommentRepository, UserRepository])],
    controllers: [EssayResultCommentController],
    providers: [EssayResultCommentService],
    exports: [EssayResultCommentService],
})
export class EssayResultCommentModule {}
