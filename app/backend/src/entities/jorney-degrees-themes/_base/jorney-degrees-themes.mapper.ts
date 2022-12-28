import { JorneyDegreesThemes } from './jorney-degrees-themes.entity';
import { JorneyDegreesThemesDTO } from './jorney-degrees-themes.dto';

/**
 * A JorneyDegreesThemes mapper object.
 */
export class JorneyDegreesThemesMapper {
    static fromDTOtoEntity(entityDTO: JorneyDegreesThemesDTO): JorneyDegreesThemes {
        if (!entityDTO) {
            return;
        }
        let entity = new JorneyDegreesThemes();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: JorneyDegreesThemes): JorneyDegreesThemesDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyDegreesThemesDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
