import { AdminProfile } from './admin-profile.entity';
import { AdminProfileDTO } from './admin-profile.dto';

/**
 * A AdminProfile mapper object.
 */
export class AdminProfileMapper {
    static fromDTOtoEntity(entityDTO: AdminProfileDTO): AdminProfile {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminProfile();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminProfile): AdminProfileDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminProfileDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
