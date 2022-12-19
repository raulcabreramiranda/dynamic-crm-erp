import { Question } from '../../../entities/question/_base/question.entity';
import { QuestionDTO } from './question.dto';

/**
 * A Question mapper object.
 */
export class QuestionMapper {
    static fromDTOtoEntity(entityDTO: QuestionDTO): Question {
        if (!entityDTO) {
            return;
        }
        let entity = new Question();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Question): QuestionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
