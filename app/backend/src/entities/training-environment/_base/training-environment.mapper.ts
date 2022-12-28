import { TrainingEnvironment } from './training-environment.entity';
import { TrainingEnvironmentDTO } from './training-environment.dto';

/**
 * A TrainingEnvironment mapper object.
 */
export class TrainingEnvironmentMapper {
    static fromDTOtoEntity(entityDTO: TrainingEnvironmentDTO): TrainingEnvironment {
        if (!entityDTO) {
            return;
        }
        let entity = new TrainingEnvironment();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TrainingEnvironment): TrainingEnvironmentDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TrainingEnvironmentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
