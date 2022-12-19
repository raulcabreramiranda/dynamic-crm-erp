import { EssayResultComment } from '../../../entities/essay-result-comment/_base/essay-result-comment.entity';
import { EssayResultCommentDTO } from './essay-result-comment.dto';

/**
 * A EssayResultComment mapper object.
 */
export class EssayResultCommentMapper {
    static fromDTOtoEntity(entityDTO: EssayResultCommentDTO): EssayResultComment {
        if (!entityDTO) {
            return;
        }
        let entity = new EssayResultComment();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EssayResultComment): EssayResultCommentDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EssayResultCommentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
