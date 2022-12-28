import { AdminAuditEntity } from './admin-audit-entity.entity';
import { AdminAuditEntityDTO } from './admin-audit-entity.dto';

/**
 * A AdminAuditEntity mapper object.
 */
export class AdminAuditEntityMapper {
    static fromDTOtoEntity(entityDTO: AdminAuditEntityDTO): AdminAuditEntity {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminAuditEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminAuditEntity): AdminAuditEntityDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminAuditEntityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
