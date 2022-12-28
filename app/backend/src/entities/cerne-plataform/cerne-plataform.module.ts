import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { CernePlataformRepository } from './cerne-plataform.repository';

import { CernePlataformController } from './cerne-plataform.controller';

import { CernePlataformService } from './cerne-plataform.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CernePlataformRepository, UserRepository])],
    controllers: [CernePlataformController],
    providers: [CernePlataformService],
    exports: [CernePlataformService],
})
export class CernePlataformModule {}
