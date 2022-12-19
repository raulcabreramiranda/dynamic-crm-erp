import { ExamsMasterKnowledgeArea } from '../../../entities/exams-master-knowledge-area/_base/exams-master-knowledge-area.entity';
import { ExamsMasterKnowledgeAreaDTO } from './exams-master-knowledge-area.dto';

/**
 * A ExamsMasterKnowledgeArea mapper object.
 */
export class ExamsMasterKnowledgeAreaMapper {
    static fromDTOtoEntity(entityDTO: ExamsMasterKnowledgeAreaDTO): ExamsMasterKnowledgeArea {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamsMasterKnowledgeArea();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamsMasterKnowledgeArea): ExamsMasterKnowledgeAreaDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamsMasterKnowledgeAreaDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
