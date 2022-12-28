import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ConfigureApplicationRepository } from './configure-application.repository';

import { ConfigureApplicationController } from './configure-application.controller';

import { ConfigureApplicationService } from './configure-application.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ConfigureApplicationRepository, UserRepository])],
    controllers: [ConfigureApplicationController],
    providers: [ConfigureApplicationService],
    exports: [ConfigureApplicationService],
})
export class ConfigureApplicationModule {}
