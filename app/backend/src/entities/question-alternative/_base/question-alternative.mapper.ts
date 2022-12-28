import { QuestionAlternative } from './question-alternative.entity';
import { QuestionAlternativeDTO } from './question-alternative.dto';

/**
 * A QuestionAlternative mapper object.
 */
export class QuestionAlternativeMapper {
    static fromDTOtoEntity(entityDTO: QuestionAlternativeDTO): QuestionAlternative {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionAlternative();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionAlternative): QuestionAlternativeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionAlternativeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
