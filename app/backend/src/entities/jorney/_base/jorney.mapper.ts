import { Jorney } from './jorney.entity';
import { JorneyDTO } from './jorney.dto';

/**
 * A Jorney mapper object.
 */
export class JorneyMapper {
    static fromDTOtoEntity(entityDTO: JorneyDTO): Jorney {
        if (!entityDTO) {
            return;
        }
        let entity = new Jorney();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Jorney): JorneyDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
