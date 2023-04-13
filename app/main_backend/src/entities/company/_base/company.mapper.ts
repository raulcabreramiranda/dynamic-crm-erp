import { Company } from '../../../entities/company/_base/company.entity';
import { CompanyDTO } from './company.dto';

/**
 * A Company mapper object.
 */
export class CompanyMapper {
    static fromDTOtoEntity(entityDTO: CompanyDTO): Company {
        if (!entityDTO) {
            return;
        }
        let entity = new Company();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Company): CompanyDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CompanyDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
