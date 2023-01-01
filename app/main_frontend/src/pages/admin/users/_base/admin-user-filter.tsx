import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from '@mui/material/Button';

import { EntityContext } from './admin-user';
import { apiGetList } from './admin-user-services';

import FilterBoolean from 'src/layouts/components/inputs/FilterBoolean';
import FilterDate from 'src/layouts/components/inputs/FilterDate';
import FilterText from 'src/layouts/components/inputs/FilterText';
import FilterSelect from 'src/layouts/components/inputs/FilterSelect';
import FilterSelectMany from 'src/layouts/components/inputs/FilterSelectMany';
import FilterSuperSelect from 'src/layouts/components/modal-super-select/FilterSuperSelect';

const FilterList = () => {
    const { entityListSort, entityListSize, setEntityListPage, entityFilter, setEntityFilter, setEntityList } = useContext(EntityContext);
    const handleSuccessList = (response: IApiResponseProps) => {
        const _entityList = response['data'] || [];
        setEntityList(_entityList);
    };
    //  const addMethodsToFilters = (filters) => {
    //    const _filters = {}
    //    Object.keys(filters).forEach((key: string)=>{
    //      _filters[`${key}.contains`] = filters[key]
    //    })
    //    return (_filters)
    //  };

    const processFiltersValue = (value: any): string => {
        if (Array.isArray(value)) {
            return value.map(processFiltersValue).join(',');
        }
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            return value['id'];
        }
        return value;
    };

    const processFilters = (filters: any): any => {
        const _filters: any = {};
        Object.keys(entityFilter).forEach((key: string) => {
            _filters[key] = processFiltersValue(filters[key]);
        });
        return _filters;
    };

    const handleFilter = () => {
        setEntityListPage(0);
        apiGetList(
            {
                sort: entityListSort,
                filters: processFilters(entityFilter),
                page: 0,
                size: entityListSize,
            },
            handleSuccessList,
        );
    };

    const handleClear = () => {
        setEntityFilter({});
        setEntityListPage(0);
        apiGetList(
            {
                sort: entityListSort,
                filters: {},
                page: 0,
                size: entityListSize,
            },
            handleSuccessList,
        );
    };

    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <div>
                                <FilterSuperSelect
                                    id="admin-user-adminProfile-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'admin-profiles'}
                                    relationshipType={'many-to-one'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsSuperSelect={['id', 'name']}
                                    optionsShowFields={['id', 'name']}
                                    name="adminProfile"
                                    filterKey="adminProfile.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.Profile" />
                                        </>
                                    }
                                />
                                <FilterSelectMany
                                    id="admin-user-adminProfile-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'admin-profiles'}
                                    relationshipType={'many-to-one'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id', 'name']}
                                    name="adminProfile"
                                    filterKey="adminProfile.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.Profile" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <FilterSuperSelect
                                    id="admin-user-adminPermissionUsers-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'admin-permission-users'}
                                    relationshipType={'one-to-many'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsSuperSelect={['id', 'adminPermission.id', 'adminPermission.name']}
                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                    name="adminPermissionUsers"
                                    filterKey="adminPermissionUsers.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.PermissionUsers" />
                                        </>
                                    }
                                />
                                <FilterSelectMany
                                    id="admin-user-adminPermissionUsers-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'admin-permission-users'}
                                    relationshipType={'one-to-many'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                    name="adminPermissionUsers"
                                    filterKey="adminPermissionUsers.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.PermissionUsers" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <FilterSelectMany
                                    id="admin-user-adminWhiteLabel-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'admin-white-labels'}
                                    relationshipType={'many-to-one'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id']}
                                    name="adminWhiteLabel"
                                    filterKey="adminWhiteLabel.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.WhiteLabel" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Button onClick={handleFilter} variant="contained" sx={{ marginRight: 3.5 }}>
                        Filter
                    </Button>
                    <Button onClick={handleClear} variant="contained" sx={{ marginRight: 3.5 }}>
                        Clear
                    </Button>
                </form>
            </CardContent>
        </>
    );
};

export default FilterList;
