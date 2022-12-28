import { AdminUser } from './admin-user.entity';
import { AdminUserDTO } from './admin-user.dto';

/**
 * A AdminUser mapper object.
 */
export class AdminUserMapper {
    static fromDTOtoEntity(entityDTO: AdminUserDTO): AdminUser {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminUser();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminUser): AdminUserDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminUserDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
