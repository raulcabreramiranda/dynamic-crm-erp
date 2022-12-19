import { EntityRepository, Repository } from 'typeorm';
import { AdminAuditEntity } from './_base/admin-audit-entity.entity';

@EntityRepository(AdminAuditEntity)
export class AdminAuditEntityRepository extends Repository<AdminAuditEntity> {}
