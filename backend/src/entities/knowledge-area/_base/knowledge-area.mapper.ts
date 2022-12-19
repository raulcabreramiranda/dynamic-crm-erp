import { KnowledgeArea } from '../../../entities/knowledge-area/_base/knowledge-area.entity';
import { KnowledgeAreaDTO } from './knowledge-area.dto';

/**
 * A KnowledgeArea mapper object.
 */
export class KnowledgeAreaMapper {
    static fromDTOtoEntity(entityDTO: KnowledgeAreaDTO): KnowledgeArea {
        if (!entityDTO) {
            return;
        }
        let entity = new KnowledgeArea();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: KnowledgeArea): KnowledgeAreaDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new KnowledgeAreaDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
