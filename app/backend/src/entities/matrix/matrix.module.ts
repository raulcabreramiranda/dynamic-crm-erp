import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { MatrixRepository } from './matrix.repository';

import { MatrixController } from './matrix.controller';

import { MatrixService } from './matrix.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([MatrixRepository, UserRepository])],
    controllers: [MatrixController],
    providers: [MatrixService],
    exports: [MatrixService],
})
export class MatrixModule {}
