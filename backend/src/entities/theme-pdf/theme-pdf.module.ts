import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ThemePdfRepository } from './theme-pdf.repository';

import { ThemePdfController } from './theme-pdf.controller';

import { ThemePdfService } from './theme-pdf.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ThemePdfRepository, UserRepository])],
    controllers: [ThemePdfController],
    providers: [ThemePdfService],
    exports: [ThemePdfService],
})
export class ThemePdfModule {}
