import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';
import { useContext } from 'react';
import { IApiResponseProps } from 'src/util/entity-utils';
import Button from 'src/layouts/components/Button';

import EntityContext from 'src/components/contexts/Photo/photo-context';
import { apiGetList } from 'src/components/services/Photo/photo-services';

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
                        <Grid item xs={12}>
                            <FilterText
                                filterKey="title"
                                filterMethod="contains"
                                id="photo-title"
                                entityContext={EntityContext}
                                type="text"
                                name="title"
                                label={
                                    <>
                                        <Translate label={{ pt: 'title' }} contentKey="photo.title" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FilterText
                                filterKey="description"
                                filterMethod="contains"
                                id="photo-description"
                                entityContext={EntityContext}
                                type="text"
                                name="description"
                                label={
                                    <>
                                        <Translate label={{ pt: 'description' }} contentKey="photo.description" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FilterText
                                filterKey="link"
                                filterMethod="contains"
                                id="photo-link"
                                entityContext={EntityContext}
                                type="text"
                                name="link"
                                label={
                                    <>
                                        <Translate label={{ pt: 'link' }} contentKey="photo.link" />
                                    </>
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FilterSelect
                                filterKey="typeContent"
                                filterMethod="in"
                                id="photo-typeContent"
                                options={[
                                    { id: 'TEXT', label: translate('photo.PhotoTypeContent.TEXT') },
                                    { id: 'PRESENTATION', label: translate('photo.PhotoTypeContent.PRESENTATION') },
                                    { id: 'DEEPENING', label: translate('photo.PhotoTypeContent.DEEPENING') },
                                ]}
                                entityContext={EntityContext}
                                name="typeContent"
                                label={
                                    <>
                                        <Translate label={{ pt: 'typeContent' }} contentKey="photo.typeContent" />
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
