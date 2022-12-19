import { ConfigureCorrectionReviewer } from '../../../entities/configure-correction-reviewer/_base/configure-correction-reviewer.entity';
import { ConfigureCorrectionReviewerDTO } from './configure-correction-reviewer.dto';

/**
 * A ConfigureCorrectionReviewer mapper object.
 */
export class ConfigureCorrectionReviewerMapper {
    static fromDTOtoEntity(entityDTO: ConfigureCorrectionReviewerDTO): ConfigureCorrectionReviewer {
        if (!entityDTO) {
            return;
        }
        let entity = new ConfigureCorrectionReviewer();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ConfigureCorrectionReviewer): ConfigureCorrectionReviewerDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ConfigureCorrectionReviewerDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
