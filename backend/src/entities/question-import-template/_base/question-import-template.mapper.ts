import { QuestionImportTemplate } from '../../../entities/question-import-template/_base/question-import-template.entity';
import { QuestionImportTemplateDTO } from './question-import-template.dto';

/**
 * A QuestionImportTemplate mapper object.
 */
export class QuestionImportTemplateMapper {
    static fromDTOtoEntity(entityDTO: QuestionImportTemplateDTO): QuestionImportTemplate {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionImportTemplate();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionImportTemplate): QuestionImportTemplateDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionImportTemplateDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
