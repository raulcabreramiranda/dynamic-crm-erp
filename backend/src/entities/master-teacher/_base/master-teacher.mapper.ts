import { MasterTeacher } from '../../../entities/master-teacher/_base/master-teacher.entity';
import { MasterTeacherDTO } from './master-teacher.dto';

/**
 * A MasterTeacher mapper object.
 */
export class MasterTeacherMapper {
    static fromDTOtoEntity(entityDTO: MasterTeacherDTO): MasterTeacher {
        if (!entityDTO) {
            return;
        }
        let entity = new MasterTeacher();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: MasterTeacher): MasterTeacherDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MasterTeacherDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
