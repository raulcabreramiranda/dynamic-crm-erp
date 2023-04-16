import { getMany as getManyBase } from 'src/utilsFunctions';
import { AdminUser } from './_base/admin-user.entity';

import { Admin, DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminUserRepository extends Repository<AdminUser> {
  getMany(options): Promise<Array<AdminUser>>;
  getOne(options): Promise<AdminUser>;
}

export const adminUserProviders = [
  {
    provide: 'ADMINUSER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AdminUser).extend({
        async getMany(options) {
          return await getMany(dataSource, options);
        },
        async getOne(options) {
          return await getOne(dataSource, options);
        },
      }),
    inject: ['DATA_SOURCE'],
  },
];

async function getMany(
  dataSource: DataSource,
  options,
): Promise<Array<AdminUser>> {
  const {
    userRequest = {},
    relations = [],
    order = { id: 'ASC' },
    filters = [],
    selectColumns = {},
  } = options;

  const filtersArray = Object.keys(filters).map((v) => {
    return {
      column: v,
      value: filters[v]['value'],
      operation: filters[v]?.['operation'] || 'equals',
    };
  });
  return await getManyBase(
    { relations, order },
    filtersArray,
    AdminUser,
    userRequest,
    selectColumns,
    dataSource.getRepository(AdminUser),
  );
}

async function getOne(dataSource: DataSource, options): Promise<AdminUser> {
  return (await getMany(dataSource, options)).pop();
}
