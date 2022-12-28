import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyGalerySectionSubjectRepository } from './jorney-galery-section-subject.repository';

import { JorneyGalerySectionSubjectController } from './jorney-galery-section-subject.controller';

import { JorneyGalerySectionSubjectService } from './jorney-galery-section-subject.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyGalerySectionSubjectRepository, UserRepository])],
    controllers: [JorneyGalerySectionSubjectController],
    providers: [JorneyGalerySectionSubjectService],
    exports: [JorneyGalerySectionSubjectService],
})
export class JorneyGalerySectionSubjectModule {}
