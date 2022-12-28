import { AdminUserSuperPro } from './admin-user-super-pro.entity';
import { AdminUserSuperProDTO } from './admin-user-super-pro.dto';

/**
 * A AdminUserSuperPro mapper object.
 */
export class AdminUserSuperProMapper {
    static fromDTOtoEntity(entityDTO: AdminUserSuperProDTO): AdminUserSuperPro {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminUserSuperPro();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminUserSuperPro): AdminUserSuperProDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminUserSuperProDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
