import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { SkillItemRepository } from './skill-item.repository';

import { SkillItemController } from './skill-item.controller';

import { SkillItemService } from './skill-item.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([SkillItemRepository, UserRepository])],
    controllers: [SkillItemController],
    providers: [SkillItemService],
    exports: [SkillItemService],
})
export class SkillItemModule {}
