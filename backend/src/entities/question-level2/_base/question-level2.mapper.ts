import { QuestionLevel2 } from '../../../entities/question-level2/_base/question-level2.entity';
import { QuestionLevel2DTO } from './question-level2.dto';

/**
 * A QuestionLevel2 mapper object.
 */
export class QuestionLevel2Mapper {
    static fromDTOtoEntity(entityDTO: QuestionLevel2DTO): QuestionLevel2 {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionLevel2();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionLevel2): QuestionLevel2DTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionLevel2DTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
