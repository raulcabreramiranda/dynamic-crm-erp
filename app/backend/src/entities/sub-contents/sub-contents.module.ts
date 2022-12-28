import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { SubContentsRepository } from './sub-contents.repository';

import { SubContentsController } from './sub-contents.controller';

import { SubContentsService } from './sub-contents.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([SubContentsRepository, UserRepository])],
    controllers: [SubContentsController],
    providers: [SubContentsService],
    exports: [SubContentsService],
})
export class SubContentsModule {}
