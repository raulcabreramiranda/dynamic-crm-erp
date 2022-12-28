import { QuestionLevel4 } from './question-level4.entity';
import { QuestionLevel4DTO } from './question-level4.dto';

/**
 * A QuestionLevel4 mapper object.
 */
export class QuestionLevel4Mapper {
    static fromDTOtoEntity(entityDTO: QuestionLevel4DTO): QuestionLevel4 {
        if (!entityDTO) {
            return;
        }
        let entity = new QuestionLevel4();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: QuestionLevel4): QuestionLevel4DTO {
        if (!entity) {
            return;
        }
        let entityDTO = new QuestionLevel4DTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
