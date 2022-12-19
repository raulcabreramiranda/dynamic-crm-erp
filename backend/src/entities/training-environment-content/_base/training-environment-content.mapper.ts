import { TrainingEnvironmentContent } from '../../../entities/training-environment-content/_base/training-environment-content.entity';
import { TrainingEnvironmentContentDTO } from './training-environment-content.dto';

/**
 * A TrainingEnvironmentContent mapper object.
 */
export class TrainingEnvironmentContentMapper {
    static fromDTOtoEntity(entityDTO: TrainingEnvironmentContentDTO): TrainingEnvironmentContent {
        if (!entityDTO) {
            return;
        }
        let entity = new TrainingEnvironmentContent();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TrainingEnvironmentContent): TrainingEnvironmentContentDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TrainingEnvironmentContentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
