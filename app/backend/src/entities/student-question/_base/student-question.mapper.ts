import { StudentQuestion } from './student-question.entity';
import { StudentQuestionDTO } from './student-question.dto';

/**
 * A StudentQuestion mapper object.
 */
export class StudentQuestionMapper {
    static fromDTOtoEntity(entityDTO: StudentQuestionDTO): StudentQuestion {
        if (!entityDTO) {
            return;
        }
        let entity = new StudentQuestion();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: StudentQuestion): StudentQuestionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new StudentQuestionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
