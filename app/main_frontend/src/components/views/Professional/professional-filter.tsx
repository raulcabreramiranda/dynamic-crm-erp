import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from 'src/layouts/components/Button';

import EntityContext from 'src/components/contexts/Professional/professional-context';
import { apiGetList } from 'src/components/services/Professional/professional-services';

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
                                filterKey="name"
                                filterMethod="contains"
                                id="professional-name"
                                entityContext={EntityContext}
                                type="text"
                                name="name"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Nome' }} contentKey="professional.name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterDate
                                filterKey="birthDate"
                                filterMethod="equals"
                                dateType="DateTime"
                                id="professional-birthDate"
                                entityContext={EntityContext}
                                type="checkbox"
                                name="birthDate"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Data de nascimento' }} contentKey="professional.birthDate" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="cpf"
                                filterMethod="contains"
                                id="professional-cpf"
                                entityContext={EntityContext}
                                type="text"
                                name="cpf"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Cpf' }} contentKey="professional.cpf" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="rg"
                                filterMethod="contains"
                                id="professional-rg"
                                entityContext={EntityContext}
                                type="text"
                                name="rg"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Rg' }} contentKey="professional.rg" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="telephone"
                                filterMethod="contains"
                                id="professional-telephone"
                                entityContext={EntityContext}
                                type="text"
                                name="telephone"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Celular' }} contentKey="professional.telephone" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="email"
                                filterMethod="contains"
                                id="professional-email"
                                entityContext={EntityContext}
                                type="text"
                                name="email"
                                label={
                                    <>
                                        <Translate label={{ pt: 'E-mail' }} contentKey="professional.email" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="contract"
                                filterMethod="contains"
                                id="professional-contract"
                                entityContext={EntityContext}
                                type="text"
                                name="contract"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Contrato' }} contentKey="professional.contract" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterDate
                                filterKey="startDate"
                                filterMethod="equals"
                                dateType="DateTime"
                                id="professional-startDate"
                                entityContext={EntityContext}
                                type="checkbox"
                                name="startDate"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Data de início' }} contentKey="professional.startDate" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterDate
                                filterKey="endDate"
                                filterMethod="equals"
                                dateType="DateTime"
                                id="professional-endDate"
                                entityContext={EntityContext}
                                type="checkbox"
                                name="endDate"
                                label={
                                    <>
                                        <Translate label={{ pt: 'Data de término' }} contentKey="professional.endDate" />
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
