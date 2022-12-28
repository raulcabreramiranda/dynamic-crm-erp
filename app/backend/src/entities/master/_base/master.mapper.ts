import { Master } from './master.entity';
import { MasterDTO } from './master.dto';

/**
 * A Master mapper object.
 */
export class MasterMapper {
    static fromDTOtoEntity(entityDTO: MasterDTO): Master {
        if (!entityDTO) {
            return;
        }
        let entity = new Master();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Master): MasterDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MasterDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
