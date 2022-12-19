import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { MatrixAnnulmentReasonRepository } from './matrix-annulment-reason.repository';

import { MatrixAnnulmentReasonController } from './matrix-annulment-reason.controller';

import { MatrixAnnulmentReasonService } from './matrix-annulment-reason.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([MatrixAnnulmentReasonRepository, UserRepository])],
    controllers: [MatrixAnnulmentReasonController],
    providers: [MatrixAnnulmentReasonService],
    exports: [MatrixAnnulmentReasonService],
})
export class MatrixAnnulmentReasonModule {}
