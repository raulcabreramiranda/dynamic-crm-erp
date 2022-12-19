import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const BD_TYPE: any = process.env.NODE_SERVER_BD_TYPE;
const BD_HOST = process.env.NODE_SERVER_BD_HOST;
const BD_PORT = parseInt(process.env.NODE_SERVER_BD_PORT, 10);
const BD_USER = process.env.NODE_SERVER_BD_USER;
const BD_PASS = process.env.NODE_SERVER_BD_PASS;
const BD_NAME = process.env.NODE_SERVER_BD_NAME;
// const BD_SCHEMA = process.env.NODE_SERVER_BD_SCHEMA;
const BD_LOGGING = process.env.NODE_SERVER_BD_LOGGING === '1' || false;
const commonConf = {
  EXTRA: {
    validateConnection: false,
    trustServerCertificate: true,
  },
  SYNCRONIZE: true,
  ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}', __dirname + '/entities/**/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations',
  },
  MIGRATIONS_RUN: true,
};

const ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: BD_TYPE,
  host: BD_HOST,
  port: BD_PORT,
  username: BD_USER,
  password: BD_PASS,
  database: BD_NAME,
  schema: '',
  synchronize: false,
  logging: BD_LOGGING,
  extra: commonConf.EXTRA,
  entities: [__dirname + '/domain/*.entity{.ts,.js}', __dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: ['./migrations/**/*{.ts,.js}'],
  subscribers: ['./subscriber/**/*.ts'],
  // cli: {
  //   entitiesDir: 'src/entity',
  //   migrationsDir: 'src/migration',
  //   subscribersDir: 'src/subscriber',
  // },
};

export { ormconfig };
