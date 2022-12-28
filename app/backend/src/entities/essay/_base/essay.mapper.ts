import { Essay } from './essay.entity';
import { EssayDTO } from './essay.dto';

/**
 * A Essay mapper object.
 */
export class EssayMapper {
    static fromDTOtoEntity(entityDTO: EssayDTO): Essay {
        if (!entityDTO) {
            return;
        }
        let entity = new Essay();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Essay): EssayDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EssayDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
