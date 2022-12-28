import { QuestionType } from './question-type.entity';
import { QuestionTypeDTO } from './question-type.dto';

/**
 * A QuestionType mapper object.
 */
export class QuestionTypeMapper {
    static fromDTOtoEntity(entityDTO: QuestionTypeDTO): QuestionType {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionType();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionType): QuestionTypeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionTypeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
