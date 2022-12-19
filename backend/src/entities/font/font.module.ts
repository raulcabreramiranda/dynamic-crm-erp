import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { FontRepository } from './font.repository';

import { FontController } from './font.controller';

import { FontService } from './font.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([FontRepository, UserRepository])],
    controllers: [FontController],
    providers: [FontService],
    exports: [FontService],
})
export class FontModule {}
