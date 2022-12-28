import { StudentExam } from './student-exam.entity';
import { StudentExamDTO } from './student-exam.dto';

/**
 * A StudentExam mapper object.
 */
export class StudentExamMapper {
    static fromDTOtoEntity(entityDTO: StudentExamDTO): StudentExam {
        if (!entityDTO) {
            return;
        }
        let entity = new StudentExam();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: StudentExam): StudentExamDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new StudentExamDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
