import { ConfigureApplication } from '../../../entities/configure-application/_base/configure-application.entity';
import { ConfigureApplicationDTO } from './configure-application.dto';

/**
 * A ConfigureApplication mapper object.
 */
export class ConfigureApplicationMapper {
    static fromDTOtoEntity(entityDTO: ConfigureApplicationDTO): ConfigureApplication {
        if (!entityDTO) {
            return;
        }
        let entity = new ConfigureApplication();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ConfigureApplication): ConfigureApplicationDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ConfigureApplicationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
