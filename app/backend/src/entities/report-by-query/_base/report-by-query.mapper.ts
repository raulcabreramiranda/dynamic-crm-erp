import { ReportByQuery } from './report-by-query.entity';
import { ReportByQueryDTO } from './report-by-query.dto';

/**
 * A ReportByQuery mapper object.
 */
export class ReportByQueryMapper {
    static fromDTOtoEntity(entityDTO: ReportByQueryDTO): ReportByQuery {
        if (!entityDTO) {
            return;
        }
        let entity = new ReportByQuery();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ReportByQuery): ReportByQueryDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ReportByQueryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
