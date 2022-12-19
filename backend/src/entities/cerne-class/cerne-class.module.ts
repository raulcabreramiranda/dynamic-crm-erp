import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { CerneClassRepository } from './cerne-class.repository';

import { CerneClassController } from './cerne-class.controller';

import { CerneClassService } from './cerne-class.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CerneClassRepository, UserRepository])],
    controllers: [CerneClassController],
    providers: [CerneClassService],
    exports: [CerneClassService],
})
export class CerneClassModule {}
