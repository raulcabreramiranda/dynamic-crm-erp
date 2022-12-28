import { JorneyGalerySection } from './jorney-galery-section.entity';
import { JorneyGalerySectionDTO } from './jorney-galery-section.dto';

/**
 * A JorneyGalerySection mapper object.
 */
export class JorneyGalerySectionMapper {
    static fromDTOtoEntity(entityDTO: JorneyGalerySectionDTO): JorneyGalerySection {
        if (!entityDTO) {
            return;
        }
        let entity = new JorneyGalerySection();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: JorneyGalerySection): JorneyGalerySectionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyGalerySectionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
