import { QuestionMatrix } from '../../../entities/question-matrix/_base/question-matrix.entity';
import { QuestionMatrixDTO } from './question-matrix.dto';

/**
 * A QuestionMatrix mapper object.
 */
export class QuestionMatrixMapper {
    static fromDTOtoEntity(entityDTO: QuestionMatrixDTO): QuestionMatrix {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionMatrix();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionMatrix): QuestionMatrixDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionMatrixDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
