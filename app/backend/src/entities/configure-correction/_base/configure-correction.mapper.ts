import { ConfigureCorrection } from './configure-correction.entity';
import { ConfigureCorrectionDTO } from './configure-correction.dto';

/**
 * A ConfigureCorrection mapper object.
 */
export class ConfigureCorrectionMapper {
    static fromDTOtoEntity(entityDTO: ConfigureCorrectionDTO): ConfigureCorrection {
        if (!entityDTO) {
            return;
        }
        let entity = new ConfigureCorrection();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ConfigureCorrection): ConfigureCorrectionDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ConfigureCorrectionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
