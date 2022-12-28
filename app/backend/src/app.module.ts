import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth.module';

const basicModules = [
  
] as any[];
basicModules.push(AuthModule);
@Module({
  imports: [
   //  DatabaseModule,
    ...basicModules,

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
