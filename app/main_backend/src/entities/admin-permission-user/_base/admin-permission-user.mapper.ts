import { AdminPermissionUser } from '../../../entities/admin-permission-user/_base/admin-permission-user.entity';
import { AdminPermissionUserDTO } from './admin-permission-user.dto';

/**
 * A AdminPermissionUser mapper object.
 */
export class AdminPermissionUserMapper {
    static fromDTOtoEntity(entityDTO: AdminPermissionUserDTO): AdminPermissionUser {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminPermissionUser();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminPermissionUser): AdminPermissionUserDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminPermissionUserDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
