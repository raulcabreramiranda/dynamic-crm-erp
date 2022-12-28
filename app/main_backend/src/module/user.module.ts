import { Module } from '@nestjs/common';

import { UserController } from '../web/rest/user.controller';
import { UserRepository } from '../repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../service/user.service';
import { AdminAuditEntityRepository as AuditEntityRepository } from '../entities/admin-audit-entity/admin-audit-entity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, AuditEntityRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
