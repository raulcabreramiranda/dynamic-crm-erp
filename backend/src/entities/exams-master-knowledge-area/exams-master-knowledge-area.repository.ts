import { EntityRepository, Repository } from 'typeorm';
import { ExamsMasterKnowledgeArea } from './_base/exams-master-knowledge-area.entity';

@EntityRepository(ExamsMasterKnowledgeArea)
export class ExamsMasterKnowledgeAreaRepository extends Repository<ExamsMasterKnowledgeArea> {}
