import { ThemePdf } from './theme-pdf.entity';
import { ThemePdfDTO } from './theme-pdf.dto';

/**
 * A ThemePdf mapper object.
 */
export class ThemePdfMapper {
    static fromDTOtoEntity(entityDTO: ThemePdfDTO): ThemePdf {
        if (!entityDTO) {
            return;
        }
        let entity = new ThemePdf();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ThemePdf): ThemePdfDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ThemePdfDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
