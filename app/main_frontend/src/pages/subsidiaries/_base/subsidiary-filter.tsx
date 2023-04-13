import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from 'src/layouts/components/Button';

import { EntityContext } from './subsidiary';
import { apiGetList } from 'src/pages/subsidiaries/_base/subsidiary-services';

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
                                filterKey="commercialName"
                                filterMethod="contains"
                                id="subsidiary-commercialName"
                                entityContext={EntityContext}
                                type="text"
                                name="commercialName"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Nome comercial' }} contentKey="subsidiary.commercialName" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="corporateName"
                                filterMethod="contains"
                                id="subsidiary-corporateName"
                                entityContext={EntityContext}
                                type="text"
                                name="corporateName"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Razão social' }} contentKey="subsidiary.corporateName" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="cnpj"
                                filterMethod="contains"
                                id="subsidiary-cnpj"
                                entityContext={EntityContext}
                                type="text"
                                name="cnpj"
                                label={
                                    <>
                                        <Translate label={{ pt: 'CNPJ' }} contentKey="subsidiary.cnpj" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="telephone"
                                filterMethod="contains"
                                id="subsidiary-telephone"
                                entityContext={EntityContext}
                                type="text"
                                name="telephone"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Telefone' }} contentKey="subsidiary.telephone" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="email"
                                filterMethod="contains"
                                id="subsidiary-email"
                                entityContext={EntityContext}
                                type="text"
                                name="email"
                                label={
                                    <>
                                        <Translate label={{ pt: 'E-mail' }} contentKey="subsidiary.email" />
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
