import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { CerneDegreeRepository } from './cerne-degree.repository';

import { CerneDegreeController } from './cerne-degree.controller';

import { CerneDegreeService } from './cerne-degree.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CerneDegreeRepository, UserRepository])],
    controllers: [CerneDegreeController],
    providers: [CerneDegreeService],
    exports: [CerneDegreeService],
})
export class CerneDegreeModule {}
