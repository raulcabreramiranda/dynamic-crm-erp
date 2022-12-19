import { ReportQueryTemplate } from '../../../entities/report-query-template/_base/report-query-template.entity';
import { ReportQueryTemplateDTO } from './report-query-template.dto';

/**
 * A ReportQueryTemplate mapper object.
 */
export class ReportQueryTemplateMapper {
    static fromDTOtoEntity(entityDTO: ReportQueryTemplateDTO): ReportQueryTemplate {
        if (!entityDTO) {
            return;
        }
        let entity = new ReportQueryTemplate();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ReportQueryTemplate): ReportQueryTemplateDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ReportQueryTemplateDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
