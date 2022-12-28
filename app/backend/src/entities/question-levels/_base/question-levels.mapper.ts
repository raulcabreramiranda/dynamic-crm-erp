import { QuestionLevels } from './question-levels.entity';
import { QuestionLevelsDTO } from './question-levels.dto';

/**
 * A QuestionLevels mapper object.
 */
export class QuestionLevelsMapper {
    static fromDTOtoEntity(entityDTO: QuestionLevelsDTO): QuestionLevels {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionLevels();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionLevels): QuestionLevelsDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionLevelsDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
