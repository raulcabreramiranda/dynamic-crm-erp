import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { JorneyDegreeRepository } from './jorney-degree.repository';

import { JorneyDegreeController } from './jorney-degree.controller';

import { JorneyDegreeService } from './jorney-degree.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([JorneyDegreeRepository, UserRepository])],
    controllers: [JorneyDegreeController],
    providers: [JorneyDegreeService],
    exports: [JorneyDegreeService],
})
export class JorneyDegreeModule {}
