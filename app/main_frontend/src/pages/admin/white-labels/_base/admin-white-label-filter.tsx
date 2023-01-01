import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from '@mui/material/Button';

import { EntityContext } from './admin-white-label';
import { apiGetList } from './admin-white-label-services';

import FilterBoolean from 'src/layouts/components/inputs/FilterBoolean';
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
                                filterKey="name"
                                filterMethod="contains"
                                id="admin-white-label-name"
                                entityContext={EntityContext}
                                type="text"
                                name="name"
                                label={
                                    <>
                                        <Translate contentKey="adminWhiteLabel.name" />
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
