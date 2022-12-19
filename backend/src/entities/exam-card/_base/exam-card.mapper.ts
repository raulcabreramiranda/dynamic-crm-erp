import { ExamCard } from '../../../entities/exam-card/_base/exam-card.entity';
import { ExamCardDTO } from './exam-card.dto';

/**
 * A ExamCard mapper object.
 */
export class ExamCardMapper {
    static fromDTOtoEntity(entityDTO: ExamCardDTO): ExamCard {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamCard();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamCard): ExamCardDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamCardDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
