import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyGalerySectionRepository } from './jorney-galery-section.repository';

import { JorneyGalerySectionController } from './jorney-galery-section.controller';

import { JorneyGalerySectionService } from './jorney-galery-section.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyGalerySectionRepository, UserRepository])],
    controllers: [JorneyGalerySectionController],
    providers: [JorneyGalerySectionService],
    exports: [JorneyGalerySectionService],
})
export class JorneyGalerySectionModule {}
