import { QuestionLevel1 } from '../../../entities/question-level1/_base/question-level1.entity';
import { QuestionLevel1DTO } from './question-level1.dto';

/**
 * A QuestionLevel1 mapper object.
 */
export class QuestionLevel1Mapper {
    static fromDTOtoEntity(entityDTO: QuestionLevel1DTO): QuestionLevel1 {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionLevel1();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionLevel1): QuestionLevel1DTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionLevel1DTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
