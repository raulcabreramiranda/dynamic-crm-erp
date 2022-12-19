import { QuestionText } from '../../../entities/question-text/_base/question-text.entity';
import { QuestionTextDTO } from './question-text.dto';

/**
 * A QuestionText mapper object.
 */
export class QuestionTextMapper {
    static fromDTOtoEntity(entityDTO: QuestionTextDTO): QuestionText {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionText();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionText): QuestionTextDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionTextDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
