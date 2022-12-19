import { ContentsMasterTeacher } from '../../../entities/contents-master-teacher/_base/contents-master-teacher.entity';
import { ContentsMasterTeacherDTO } from './contents-master-teacher.dto';

/**
 * A ContentsMasterTeacher mapper object.
 */
export class ContentsMasterTeacherMapper {
    static fromDTOtoEntity(entityDTO: ContentsMasterTeacherDTO): ContentsMasterTeacher {
        if (!entityDTO) {
            return;
        }
        let entity = new ContentsMasterTeacher();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ContentsMasterTeacher): ContentsMasterTeacherDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ContentsMasterTeacherDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
