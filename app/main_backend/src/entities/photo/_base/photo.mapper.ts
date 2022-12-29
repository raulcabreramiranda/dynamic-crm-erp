import { Photo } from '../../../entities/photo/_base/photo.entity';
import { PhotoDTO } from './photo.dto';

/**
 * A Photo mapper object.
 */
export class PhotoMapper {
    static fromDTOtoEntity(entityDTO: PhotoDTO): Photo {
        if (!entityDTO) {
            return;
        }
        let entity = new Photo();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Photo): PhotoDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new PhotoDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
