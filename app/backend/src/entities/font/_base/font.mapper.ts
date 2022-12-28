import { Font } from './font.entity';
import { FontDTO } from './font.dto';

/**
 * A Font mapper object.
 */
export class FontMapper {
    static fromDTOtoEntity(entityDTO: FontDTO): Font {
        if (!entityDTO) {
            return;
        }
        let entity = new Font();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Font): FontDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new FontDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
