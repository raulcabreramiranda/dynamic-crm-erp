import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from 'src/layouts/components/Button';

import { EntityContext } from './business-entity-field';
import { apiGetList } from 'src/pages/BusinessEntityField/_base/business-entity-field-services';

import FilterBoolean from 'src/layouts/components/inputs/FilterBoolean';
import FilterDate from 'src/layouts/components/inputs/FilterDate';
import FilterText from 'src/layouts/components/inputs/FilterText';
import FilterSelect from 'src/layouts/components/inputs/FilterSelect';
import FilterSelectMany from 'src/layouts/components/inputs/FilterSelectMany';
import FilterSuperSelect from 'src/layouts/components/modal-super-select/FilterSuperSelect';

const FilterList = () => {
    const { baseFilters, entityListSort, entityListSize, setEntityListPage, entityFilter, setEntityFilter, setEntityList } = useContext(EntityContext);
    const handleSuccessList = (response: IApiResponseProps) => {
        const _entityList = response['data'] || [];
        setEntityList(_entityList);
    };
    //  const addMethodsToFilters = (filters) => {
    //    const _filters = baseFilters
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
        return { ..._filters, ...baseFilters };
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
        setEntityFilter(baseFilters || {});
        setEntityListPage(0);
        apiGetList(
            {
                sort: entityListSort,
                filters: baseFilters || {},
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
                                filterKey="fieldName"
                                filterMethod="contains"
                                id="business-entity-field-fieldName"
                                entityContext={EntityContext}
                                type="text"
                                name="fieldName"
                                label={
                                    <>
                                        <Translate contentKey="businessEntityField.Name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="fieldNameHumanized"
                                filterMethod="contains"
                                id="business-entity-field-fieldNameHumanized"
                                entityContext={EntityContext}
                                type="text"
                                name="fieldNameHumanized"
                                label={
                                    <>
                                        <Translate contentKey="businessEntityField.Humanized" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterSelect
                                filterKey="fieldType"
                                filterMethod="in"
                                id="business-entity-field-fieldType"
                                options={[
                                    { id: 'FRONT', label: translate('businessEntityField.BusinessEntityFieldFieldType.FRONT') },
                                    { id: 'END', label: translate('businessEntityField.BusinessEntityFieldFieldType.END') },
                                ]}
                                entityContext={EntityContext}
                                name="fieldType"
                                label={
                                    <>
                                        <Translate contentKey="businessEntityField.Type" />
                                    </>
                                }
                            />
                        </Grid>
                    </Grid>

                    <Button onClick={handleFilter}>Filter</Button>
                    <Button onClick={handleClear}>Clear</Button>
                </form>
            </CardContent>
        </>
    );
};

export default FilterList;
