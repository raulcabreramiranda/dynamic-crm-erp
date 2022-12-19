import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyDegreesThemesRepository } from './jorney-degrees-themes.repository';

import { JorneyDegreesThemesController } from './jorney-degrees-themes.controller';

import { JorneyDegreesThemesService } from './jorney-degrees-themes.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyDegreesThemesRepository, UserRepository])],
    controllers: [JorneyDegreesThemesController],
    providers: [JorneyDegreesThemesService],
    exports: [JorneyDegreesThemesService],
})
export class JorneyDegreesThemesModule {}
