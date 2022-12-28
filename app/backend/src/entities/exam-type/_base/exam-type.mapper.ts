import { ExamType } from './exam-type.entity';
import { ExamTypeDTO } from './exam-type.dto';

/**
 * A ExamType mapper object.
 */
export class ExamTypeMapper {
    static fromDTOtoEntity(entityDTO: ExamTypeDTO): ExamType {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamType();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamType): ExamTypeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamTypeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
