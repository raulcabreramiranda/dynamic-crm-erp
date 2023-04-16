import { DataSource } from 'typeorm';

const BD_TYPE: any = process.env.NODE_SERVER_BD_TYPE;
const BD_HOST = process.env.NODE_SERVER_BD_HOST;
const BD_PORT = parseInt(process.env.NODE_SERVER_BD_PORT, 10);
const BD_USER = process.env.NODE_SERVER_BD_USER;
const BD_PASS = process.env.NODE_SERVER_BD_PASS;
const BD_NAME = process.env.NODE_SERVER_BD_NAME;
// const BD_SCHEMA = process.env.NODE_SERVER_BD_SCHEMA;
const BD_LOGGING = process.env.NODE_SERVER_BD_LOGGING === '1' || false;
const BD_SYNC = process.env.NODE_SERVER_BD_SYNC === '1' || false;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: BD_TYPE,
        logging: BD_LOGGING,
        host: BD_HOST,
        port: BD_PORT,
        username: BD_USER,
        password: BD_PASS,
        database: BD_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: BD_SYNC,
        schema: '',
        requestTimeout: 60000,
        migrations: ['./migrations/**/*{.ts,.js}'],
        subscribers: ['./subscriber/**/*.ts'],
        extra: {
          validateConnection: false,
          trustServerCertificate: true,
        },
      });

      return dataSource.initialize();
    },
  },
];
