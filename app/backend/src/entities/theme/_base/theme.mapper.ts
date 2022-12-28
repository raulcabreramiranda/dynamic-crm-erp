import { Theme } from './theme.entity';
import { ThemeDTO } from './theme.dto';

/**
 * A Theme mapper object.
 */
export class ThemeMapper {
    static fromDTOtoEntity(entityDTO: ThemeDTO): Theme {
        if (!entityDTO) {
            return;
        }
        let entity = new Theme();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Theme): ThemeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ThemeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
