import { AdminPermissionProfile } from './admin-permission-profile.entity';
import { AdminPermissionProfileDTO } from './admin-permission-profile.dto';

/**
 * A AdminPermissionProfile mapper object.
 */
export class AdminPermissionProfileMapper {
    static fromDTOtoEntity(entityDTO: AdminPermissionProfileDTO): AdminPermissionProfile {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminPermissionProfile();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminPermissionProfile): AdminPermissionProfileDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminPermissionProfileDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
