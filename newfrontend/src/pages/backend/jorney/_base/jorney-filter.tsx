import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputUploadImage from 'src/layouts/components/inputs/InputUploadImage';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from '@mui/material/Button';

import { EntityContext } from './jorney';
import { apiGetList } from './jorney-services';

import FilterDate from 'src/layouts/components/inputs/FilterDate';
import FilterText from 'src/layouts/components/inputs/FilterText';
import FilterSelect from 'src/layouts/components/inputs/FilterSelect';
import FilterSelectMany from 'src/layouts/components/inputs/FilterSelectMany';

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
                            <FilterText
                                filterKey="imageBanner"
                                filterMethod="contains"
                                id="jorney-imageBanner"
                                entityContext={EntityContext}
                                type="text"
                                name="imageBanner"
                                label={
                                    <>
                                        <Translate contentKey="jorney.Image" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterDate
                                filterKey="year"
                                filterMethod="between"
                                dateType="MobileDate"
                                id="jorney-year"
                                entityContext={EntityContext}
                                type="checkbox"
                                name="year"
                                label={
                                    <>
                                        <Translate contentKey="jorney.Year" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="name"
                                filterMethod="contains"
                                id="jorney-name"
                                entityContext={EntityContext}
                                type="text"
                                name="name"
                                label={
                                    <>
                                        <Translate contentKey="jorney.Name" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterSelect
                                filterKey="jorneyType"
                                filterMethod="in"
                                id="jorney-jorneyType"
                                options={[
                                    { id: 'JORNEY', label: translate('jorney.JorneyType.JORNEY') },
                                    { id: 'FREE_PRODUCTION', label: translate('jorney.JorneyType.FREE_PRODUCTION') },
                                    { id: 'SIMULATE', label: translate('jorney.JorneyType.SIMULATE') },
                                ]}
                                entityContext={EntityContext}
                                name="jorneyType"
                                label={
                                    <>
                                        <Translate contentKey="jorney.Jorney Type" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FilterText
                                filterKey="clientId"
                                filterMethod="contains"
                                id="jorney-clientId"
                                entityContext={EntityContext}
                                type="number"
                                precision={0}
                                name="clientId"
                                label={
                                    <>
                                        <Translate contentKey="jorney.Client Id" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <FilterSelectMany
                                    id="jorney-jorneyDegrees-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'jorney-degrees'}
                                    optionsSort={{ year: 'asc' }}
                                    optionsShowFields={['year']}
                                    name="jorneyDegrees"
                                    filterKey="jorneyDegrees.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="jorney.Jorney Degrees" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <FilterSelectMany
                                    id="jorney-themes-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'themes'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id']}
                                    name="themes"
                                    filterKey="themes.id"
                                    filterMethod="in"
                                    label={
                                        <>
                                            <Translate contentKey="jorney.Themes" />
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
