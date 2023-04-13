import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminAuditEntityModule } from './entities/admin-audit-entity/admin-audit-entity.module';
import { AdminAuthorityModule } from './entities/admin-authority/admin-authority.module';
import { AdminPermissionModule } from './entities/admin-permission/admin-permission.module';
import { AdminPermissionProfileModule } from './entities/admin-permission-profile/admin-permission-profile.module';
import { AdminPermissionUserModule } from './entities/admin-permission-user/admin-permission-user.module';
import { AdminProfileModule } from './entities/admin-profile/admin-profile.module';
import { AdminUserModule } from './entities/admin-user/admin-user.module';
import { AdminWhiteLabelModule } from './entities/admin-white-label/admin-white-label.module';
import { CompanyModule } from './entities/company/company.module';
import { CustomerModule } from './entities/customer/customer.module';
import { PatientModule } from './entities/patient/patient.module';
import { PhotoModule } from './entities/photo/photo.module';
import { ProfessionalModule } from './entities/professional/professional.module';
import { SubsidiaryModule } from './entities/subsidiary/subsidiary.module';
// nedle-add-entity-module-to-main-import - Will import entity modules here, do not remove

@Module({
  imports: [
    DatabaseModule,
    AdminAuditEntityModule,
    AdminAuthorityModule,
    AdminPermissionModule,
    AdminPermissionProfileModule,
    AdminPermissionUserModule,
    AdminProfileModule,
    AdminUserModule,
    AdminWhiteLabelModule,
    CompanyModule,
    CustomerModule,
    PatientModule,
    PhotoModule,
    ProfessionalModule,
    SubsidiaryModule,
// needle-add-entity-module-to-main - Will add entity modules here, do not remove
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
