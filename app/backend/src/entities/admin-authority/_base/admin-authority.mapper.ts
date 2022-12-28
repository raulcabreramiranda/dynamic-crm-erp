import { AdminAuthority } from './admin-authority.entity';
import { AdminAuthorityDTO } from './admin-authority.dto';

/**
 * A AdminAuthority mapper object.
 */
export class AdminAuthorityMapper {
    static fromDTOtoEntity(entityDTO: AdminAuthorityDTO): AdminAuthority {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminAuthority();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminAuthority): AdminAuthorityDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminAuthorityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
