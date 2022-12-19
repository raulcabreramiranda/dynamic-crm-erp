import { EssayPreUpload } from '../../../entities/essay-pre-upload/_base/essay-pre-upload.entity';
import { EssayPreUploadDTO } from './essay-pre-upload.dto';

/**
 * A EssayPreUpload mapper object.
 */
export class EssayPreUploadMapper {
    static fromDTOtoEntity(entityDTO: EssayPreUploadDTO): EssayPreUpload {
        if (!entityDTO) {
            return;
        }
        let entity = new EssayPreUpload();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EssayPreUpload): EssayPreUploadDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EssayPreUploadDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
