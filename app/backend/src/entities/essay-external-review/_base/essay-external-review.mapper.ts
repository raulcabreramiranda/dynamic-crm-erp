import { EssayExternalReview } from './essay-external-review.entity';
import { EssayExternalReviewDTO } from './essay-external-review.dto';

/**
 * A EssayExternalReview mapper object.
 */
export class EssayExternalReviewMapper {
    static fromDTOtoEntity(entityDTO: EssayExternalReviewDTO): EssayExternalReview {
        if (!entityDTO) {
            return;
        }
        let entity = new EssayExternalReview();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EssayExternalReview): EssayExternalReviewDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EssayExternalReviewDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
