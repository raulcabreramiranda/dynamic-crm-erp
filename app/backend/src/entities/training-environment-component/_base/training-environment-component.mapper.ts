import { TrainingEnvironmentComponent } from './training-environment-component.entity';
import { TrainingEnvironmentComponentDTO } from './training-environment-component.dto';

/**
 * A TrainingEnvironmentComponent mapper object.
 */
export class TrainingEnvironmentComponentMapper {
    static fromDTOtoEntity(entityDTO: TrainingEnvironmentComponentDTO): TrainingEnvironmentComponent {
        if (!entityDTO) {
            return;
        }
        let entity = new TrainingEnvironmentComponent();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TrainingEnvironmentComponent): TrainingEnvironmentComponentDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TrainingEnvironmentComponentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
