import { QuestionLevel3 } from './question-level3.entity';
import { QuestionLevel3DTO } from './question-level3.dto';

/**
 * A QuestionLevel3 mapper object.
 */
export class QuestionLevel3Mapper {
    static fromDTOtoEntity(entityDTO: QuestionLevel3DTO): QuestionLevel3 {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionLevel3();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionLevel3): QuestionLevel3DTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionLevel3DTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
