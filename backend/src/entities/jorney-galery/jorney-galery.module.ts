import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyGaleryRepository } from './jorney-galery.repository';

import { JorneyGaleryController } from './jorney-galery.controller';

import { JorneyGaleryService } from './jorney-galery.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyGaleryRepository, UserRepository])],
    controllers: [JorneyGaleryController],
    providers: [JorneyGaleryService],
    exports: [JorneyGaleryService],
})
export class JorneyGaleryModule {}
