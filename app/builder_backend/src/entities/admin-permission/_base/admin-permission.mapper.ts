import { AdminPermission } from '../../../entities/admin-permission/_base/admin-permission.entity';
import { AdminPermissionDTO } from './admin-permission.dto';

/**
 * A AdminPermission mapper object.
 */
export class AdminPermissionMapper {
    static fromDTOtoEntity(entityDTO: AdminPermissionDTO): AdminPermission {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminPermission();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminPermission): AdminPermissionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminPermissionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
