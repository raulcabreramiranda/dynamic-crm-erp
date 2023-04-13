import Label from 'src/layouts/components/Label';
import { Context, ReactElement, useContext } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import FilterSpecified from './FilterSpecified';

interface Props {
    entityContext: Context<any>;
    options: any[];
    labelPos?: "top" | "left";
    filterKey: string;
    id?: string;
    name: string;
    label: string | ReactElement;
    filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified';
}

const FilterSelect = ({ options, name, label, entityContext: EntityContext, filterKey, filterMethod }: Props) => {
    const { entityFilter, setEntityFilter } = useContext(EntityContext);
    const fieldName = `${filterKey}.${filterMethod}`;

    if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />;

    const handleChange = (value: any[]) => {
        const _entityFilter = { ...entityFilter };
        _entityFilter[fieldName] = value;

        if (_entityFilter[fieldName] === 0) {
            delete _entityFilter[fieldName];
        }
        setEntityFilter(_entityFilter);
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    return (
        <>
            <Label>{label}</Label>
            <MultiSelect
                id="tags-outlined"
                value={entityFilter[fieldName] || []}
                onChange={(e) => handleChange(e.value)}
                options={!!options && options.length > 0 ? options : []}
                optionLabel="label"
                placeholder="Select"
                filter
                display="chip"
                itemTemplate={itemTemplate}
            />
        </>
    );
};

export default FilterSelect;
