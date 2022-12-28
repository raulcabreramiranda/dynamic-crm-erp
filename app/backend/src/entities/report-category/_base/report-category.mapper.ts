import { ReportCategory } from './report-category.entity';
import { ReportCategoryDTO } from './report-category.dto';

/**
 * A ReportCategory mapper object.
 */
export class ReportCategoryMapper {
    static fromDTOtoEntity(entityDTO: ReportCategoryDTO): ReportCategory {
        if (!entityDTO) {
            return;
        }
        let entity = new ReportCategory();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ReportCategory): ReportCategoryDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ReportCategoryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
