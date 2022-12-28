import { EssayResult } from './essay-result.entity';
import { EssayResultDTO } from './essay-result.dto';

/**
 * A EssayResult mapper object.
 */
export class EssayResultMapper {
    static fromDTOtoEntity(entityDTO: EssayResultDTO): EssayResult {
        if (!entityDTO) {
            return;
        }
        let entity = new EssayResult();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EssayResult): EssayResultDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EssayResultDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
