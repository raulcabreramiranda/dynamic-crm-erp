import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewModule } from './client/view.module';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';

import { AdminAuditEntityModule } from './entities/admin-audit-entity/admin-audit-entity.module';
import { AdminAuthorityModule } from './entities/admin-authority/admin-authority.module';
import { AdminPermissionProfileModule } from './entities/admin-permission-profile/admin-permission-profile.module';
import { AdminPermissionUserModule } from './entities/admin-permission-user/admin-permission-user.module';
import { AdminPermissionModule } from './entities/admin-permission/admin-permission.module';
import { AdminProfileModule } from './entities/admin-profile/admin-profile.module';
import { AdminUserModule } from './entities/admin-user/admin-user.module';
import { AdminWhiteLabelModule } from './entities/admin-white-label/admin-white-label.module';
import { CerneDegreeModule } from './entities/cerne-degree/cerne-degree.module';
import { CerneSchoolModule } from './entities/cerne-school/cerne-school.module';
import { CerneClassModule } from './entities/cerne-class/cerne-class.module';
import { JorneyModule } from './entities/jorney/jorney.module';
import { ThemeModule } from './entities/theme/theme.module';
import { ThemePdfModule } from './entities/theme-pdf/theme-pdf.module';
import { JorneyDegreeModule } from './entities/jorney-degree/jorney-degree.module';
import { JorneyGaleryModule } from './entities/jorney-galery/jorney-galery.module';
import { JorneyGalerySectionModule } from './entities/jorney-galery-section/jorney-galery-section.module';
import { ConfigureApplicationModule } from './entities/configure-application/configure-application.module';
import { ReviewerModule } from './entities/reviewer/reviewer.module';
import { ConfigureCorrectionModule } from './entities/configure-correction/configure-correction.module';
import { ConfigureCorrectionReviewerModule } from './entities/configure-correction-reviewer/configure-correction-reviewer.module';
import { JorneyGalerySectionSubjectModule } from './entities/jorney-galery-section-subject/jorney-galery-section-subject.module';
import { MatrixModule } from './entities/matrix/matrix.module';
import { MatrixAnnulmentReasonModule } from './entities/matrix-annulment-reason/matrix-annulment-reason.module';
import { SkillModule } from './entities/skill/skill.module';
import { SkillItemModule } from './entities/skill-item/skill-item.module';
import { EssayModule } from './entities/essay/essay.module';
import { EssayResultModule } from './entities/essay-result/essay-result.module';
import { StudentExamModule } from './entities/student-exam/student-exam.module';
import { StudentQuestionModule } from './entities/student-question/student-question.module';
import { DisciplineModule } from './entities/discipline/discipline.module';
import { ExamModule } from './entities/exam/exam.module';
import { ExamTypeModule } from './entities/exam-type/exam-type.module';
import { ExamConfigureApplicationModule } from './entities/exam-configure-application/exam-configure-application.module';
import { ExamCardModule } from './entities/exam-card/exam-card.module';
import { ExamCardReadModule } from './entities/exam-card-read/exam-card-read.module';
import { ExamTemplateModule } from './entities/exam-template/exam-template.module';
import { MasterModule } from './entities/master/master.module';
import { ExamsMasterModule } from './entities/exams-master/exams-master.module';
import { MasterTeacherModule } from './entities/master-teacher/master-teacher.module';
import { KnowledgeAreaModule } from './entities/knowledge-area/knowledge-area.module';
import { ExamsMasterKnowledgeAreaModule } from './entities/exams-master-knowledge-area/exams-master-knowledge-area.module';
import { ContentsMasterTeacherModule } from './entities/contents-master-teacher/contents-master-teacher.module';
import { SubContentsModule } from './entities/sub-contents/sub-contents.module';
import { CernePlataformUserModule } from './entities/cerne-plataform-user/cerne-plataform-user.module';
import { CernePlataformModule } from './entities/cerne-plataform/cerne-plataform.module';
import { OLDCerneSchoolModule } from './entities/o-l-d-cerne-school/o-l-d-cerne-school.module';
import { EssayResultCommentModule } from './entities/essay-result-comment/essay-result-comment.module';
import { ReportByQueryModule } from './entities/report-by-query/report-by-query.module';
import { ReportSubqueryModule } from './entities/report-subquery/report-subquery.module';
import { ReportQueryTemplateModule } from './entities/report-query-template/report-query-template.module';
import { ReportCategoryModule } from './entities/report-category/report-category.module';

import { TrainingEnvironmentModule } from './entities/training-environment/training-environment.module';
import { TrainingEnvironmentComponentModule } from './entities/training-environment-component/training-environment-component.module';
import { TrainingEnvironmentContentModule } from './entities/training-environment-content/training-environment-content.module';

import { QuestionMatrixModule } from './entities/question-matrix/question-matrix.module';
import { QuestionTypeModule } from './entities/question-type/question-type.module';
import { QuestionModule } from './entities/question/question.module';
import { QuestionAlternativeModule } from './entities/question-alternative/question-alternative.module';
import { QuestionLevel1Module } from './entities/question-level1/question-level1.module';
import { QuestionLevel2Module } from './entities/question-level2/question-level2.module';
import { QuestionLevel3Module } from './entities/question-level3/question-level3.module';
import { QuestionLevel4Module } from './entities/question-level4/question-level4.module';
import { QuestionLevelsModule } from './entities/question-levels/question-levels.module';
import { QuestionImportTemplateModule } from './entities/question-import-template/question-import-template.module';
import { DisciplineSuperProModule } from './entities/discipline-super-pro/discipline-super-pro.module';
import QuestionText from './entities/question-text/_base/question-text.entity';

// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

const basicModules = [
  TypeOrmModule.forRoot(ormconfig),
  // TypeOrmModule.forRoot(ormconfigCenter),
] as any[];
basicModules.push(AuthModule);
if (process.env.NODE_ONLY_SERVER !== '1') {
  basicModules.push(ViewModule);
}
@Module({
  imports: [
    ...basicModules,

    AdminAuditEntityModule,
    AdminAuthorityModule,
    AdminPermissionProfileModule,
    AdminPermissionUserModule,
    AdminPermissionModule,
    AdminProfileModule,
    AdminUserModule,
    AdminWhiteLabelModule,
    CerneDegreeModule,
    CerneSchoolModule,
    CerneClassModule,
    JorneyModule,
    ThemeModule,
    JorneyDegreeModule,
    JorneyGaleryModule,
    JorneyGalerySectionModule,
    EssayModule,
    EssayResultModule,
    ReviewerModule,
    ConfigureCorrectionModule,
    ConfigureCorrectionReviewerModule,
    MatrixModule,
    MatrixAnnulmentReasonModule,
    SkillModule,
    SkillItemModule,
    ConfigureApplicationModule,
    JorneyGalerySectionSubjectModule,
    EssayModule,
    EssayResultModule,
    EssayResultCommentModule,
    StudentExamModule,
    DisciplineModule,
    ExamModule,
    StudentQuestionModule,
    ExamTypeModule,
    ExamConfigureApplicationModule,
    ExamCardModule,
    ExamCardReadModule,
    ExamTemplateModule,
    MasterModule,
    ExamsMasterModule,
    MasterTeacherModule,
    KnowledgeAreaModule,
    ExamsMasterKnowledgeAreaModule,
    ContentsMasterTeacherModule,
    SubContentsModule,
    CernePlataformModule,
    CernePlataformUserModule,
    OLDCerneSchoolModule,
    ThemePdfModule,
    ReportByQueryModule,
    ReportSubqueryModule,
    ReportQueryTemplateModule,
    ReportCategoryModule,

    TrainingEnvironmentModule,
    TrainingEnvironmentComponentModule,
    TrainingEnvironmentContentModule,

    QuestionMatrixModule,
    QuestionTypeModule,
    QuestionModule,
    QuestionAlternativeModule,
    QuestionLevel1Module,
    QuestionLevel2Module,
    QuestionLevel3Module,
    QuestionLevel4Module,
    QuestionLevelsModule,
    QuestionImportTemplateModule,
    DisciplineSuperProModule,
    QuestionText,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
