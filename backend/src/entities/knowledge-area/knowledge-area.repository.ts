import { EntityRepository, Repository } from 'typeorm';
import { KnowledgeArea } from './_base/knowledge-area.entity';

@EntityRepository(KnowledgeArea)
export class KnowledgeAreaRepository extends Repository<KnowledgeArea> {}
