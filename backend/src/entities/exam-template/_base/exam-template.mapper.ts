import { ExamTemplate } from '../../../entities/exam-template/_base/exam-template.entity';
import { ExamTemplateDTO } from './exam-template.dto';

/**
 * A ExamTemplate mapper object.
 */
export class ExamTemplateMapper {
    static fromDTOtoEntity(entityDTO: ExamTemplateDTO): ExamTemplate {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamTemplate();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamTemplate): ExamTemplateDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamTemplateDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
