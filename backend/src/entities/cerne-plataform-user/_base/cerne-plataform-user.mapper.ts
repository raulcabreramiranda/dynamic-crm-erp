import { CernePlataformUser } from '../../../entities/cerne-plataform-user/_base/cerne-plataform-user.entity';
import { CernePlataformUserDTO } from './cerne-plataform-user.dto';

/**
 * A CernePlataformUser mapper object.
 */
export class CernePlataformUserMapper {
    static fromDTOtoEntity(entityDTO: CernePlataformUserDTO): CernePlataformUser {
        if (!entityDTO) {
            return;
        }
        let entity = new CernePlataformUser();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CernePlataformUser): CernePlataformUserDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CernePlataformUserDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
