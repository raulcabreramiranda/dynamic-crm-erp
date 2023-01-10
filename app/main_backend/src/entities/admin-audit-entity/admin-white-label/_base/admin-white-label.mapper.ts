import { AdminWhiteLabel } from '../../../entities/admin-white-label/_base/admin-white-label.entity';
import { AdminWhiteLabelDTO } from './admin-white-label.dto';

/**
 * A AdminWhiteLabel mapper object.
 */
export class AdminWhiteLabelMapper {
    static fromDTOtoEntity(entityDTO: AdminWhiteLabelDTO): AdminWhiteLabel {
        if (!entityDTO) {
            return;
        }
        let entity = new AdminWhiteLabel();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AdminWhiteLabel): AdminWhiteLabelDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AdminWhiteLabelDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
