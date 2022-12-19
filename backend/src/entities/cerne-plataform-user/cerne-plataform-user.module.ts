import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { CernePlataformUserRepository } from './cerne-plataform-user.repository';

import { CernePlataformUserController } from './cerne-plataform-user.controller';

import { CernePlataformUserService } from './cerne-plataform-user.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CernePlataformUserRepository, UserRepository])],
    controllers: [CernePlataformUserController],
    providers: [CernePlataformUserService],
    exports: [CernePlataformUserService],
})
export class CernePlataformUserModule {}
