
import { InputText } from 'primereact/inputtext';
import { Context, ReactElement, useContext } from 'react';
import Label from 'src/layouts/components/Label';
import FilterSpecified from './FilterSpecified';

interface Props {
    entityContext: Context<any>;
    precision?: number;
    id?: string;
    type: string;
    labelPos?: "top" | "left";
    filterKey: string;
    label: string | ReactElement;
    placeholder?: string;
    name: string;
    filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified';
}

const handleChangeByType: any = {
    text: (v: string) => v,
    number: (v: string) => v.replace(/\D/g, ''),
    float: (v: string) => v.replace(/[^\d.-]/g, '')
};

const FilterText = ({ entityContext: EntityContext, label, placeholder, name, type, filterKey, filterMethod }: Props) => {
    const { entityFilter, setEntityFilter } = useContext(EntityContext);

    if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />;

    const fieldName = `${filterKey}.${filterMethod}`;
    const fieldType = Object.keys(handleChangeByType).includes(type) ? type : 'text';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _entityFilter = { ...entityFilter };
        _entityFilter[fieldName] = handleChangeByType[fieldType](event.target.value);
        setEntityFilter(_entityFilter);
    };

    return (
        <>
            <Label>{label}</Label>
            <InputText onChange={handleChange} name={fieldName} placeholder={placeholder} value={entityFilter[fieldName] || ''} />
        </>
    );
};

export default FilterText;
