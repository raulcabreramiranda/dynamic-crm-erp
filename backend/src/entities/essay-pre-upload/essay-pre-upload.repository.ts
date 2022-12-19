import { EntityRepository, Repository } from 'typeorm';
import { EssayPreUpload } from './_base/essay-pre-upload.entity';

@EntityRepository(EssayPreUpload)
export class EssayPreUploadRepository extends Repository<EssayPreUpload> {}
