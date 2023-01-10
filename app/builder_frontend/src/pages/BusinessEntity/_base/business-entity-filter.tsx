import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from 'src/layouts/components/Button';

import { EntityContext } from './business-entity';
import { apiGetList } from './business-entity-services';

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
                        <Grid item xs={3}>
                            <FilterText
                                filterKey="entityName"
                                filterMethod="contains"
                                id="business-entity-entityName"
                                entityContext={EntityContext}
                                type="text"
                                name="entityName"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.Name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FilterText
                                filterKey="entityNameHumanized"
                                filterMethod="contains"
                                id="business-entity-entityNameHumanized"
                                entityContext={EntityContext}
                                type="text"
                                name="entityNameHumanized"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.Humanized name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <FilterText
                                filterKey="entityNameHumanizedPlural"
                                filterMethod="contains"
                                id="business-entity-entityNameHumanizedPlural"
                                entityContext={EntityContext}
                                type="text"
                                name="entityNameHumanizedPlural"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.Humanized plural name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterBoolean
                                id="business-entity-hasWhiteLabel"
                                filterKey="hasWhiteLabel"
                                filterMethod="in"
                                options={[
                                    { value: true, label: translate('businessEntity.hasWhiteLabel.YES') },
                                    { value: false, label: translate('businessEntity.hasWhiteLabel.NOT') },
                                ]}
                                entityContext={EntityContext}
                                name="hasWhiteLabel"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.hasWhiteLabel" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterBoolean
                                id="business-entity-hasDateAudit"
                                filterKey="hasDateAudit"
                                filterMethod="in"
                                options={[
                                    { value: true, label: translate('businessEntity.hasDateAudit.YES') },
                                    { value: false, label: translate('businessEntity.hasDateAudit.NOT') },
                                ]}
                                entityContext={EntityContext}
                                name="hasDateAudit"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.hasDateAudit" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FilterText
                                filterKey="frontPath"
                                filterMethod="contains"
                                id="business-entity-frontPath"
                                entityContext={EntityContext}
                                type="text"
                                name="frontPath"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.frontPath" />
                                    </>
                                }
                            />
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
