import { ExamCardRead } from '../../../entities/exam-card-read/_base/exam-card-read.entity';
import { ExamCardReadDTO } from './exam-card-read.dto';

/**
 * A ExamCardRead mapper object.
 */
export class ExamCardReadMapper {
    static fromDTOtoEntity(entityDTO: ExamCardReadDTO): ExamCardRead {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamCardRead();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamCardRead): ExamCardReadDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamCardReadDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
