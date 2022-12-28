import { ReportSubquery } from './report-subquery.entity';
import { ReportSubqueryDTO } from './report-subquery.dto';

/**
 * A ReportSubquery mapper object.
 */
export class ReportSubqueryMapper {
    static fromDTOtoEntity(entityDTO: ReportSubqueryDTO): ReportSubquery {
        if (!entityDTO) {
            return;
        }
        let entity = new ReportSubquery();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ReportSubquery): ReportSubqueryDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ReportSubqueryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
