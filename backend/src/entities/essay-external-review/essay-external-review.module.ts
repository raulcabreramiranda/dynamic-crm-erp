import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { EssayExternalReviewRepository } from './essay-external-review.repository';

import { EssayExternalReviewController } from './essay-external-review.controller';

import { EssayExternalReviewService } from './essay-external-review.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([EssayExternalReviewRepository, UserRepository])],
    controllers: [EssayExternalReviewController],
    providers: [EssayExternalReviewService],
    exports: [EssayExternalReviewService],
})
export class EssayExternalReviewModule {}
