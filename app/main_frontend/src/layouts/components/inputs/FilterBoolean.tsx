import Label from 'src/layouts/components/Label';
import { Context, ReactElement, useContext } from 'react';
import FilterSpecified from './FilterSpecified';
import { MultiSelect } from 'primereact/multiselect';

interface Props {
    entityContext: Context<any>;
    options: any[];
    labelPos?: "top" | "left";
    label: string | ReactElement;
    filterKey: string;
    filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified';
}

const FilterSelect = ({ options, label, entityContext: EntityContext, filterKey, filterMethod }: Props) => {
    const { entityFilter, setEntityFilter } = useContext(EntityContext);
    const fieldName = `${filterKey}.${filterMethod}`;

    if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />;

    const handleChange = (value: any[]) => {
        const _entityFilter = { ...entityFilter };
        const selectedValues = value.map((v: any) => (v.value ? 1 : 0));

        _entityFilter[fieldName] = selectedValues;

        if (_entityFilter[fieldName].length === 0) {
            delete _entityFilter[fieldName];
        }
        setEntityFilter(_entityFilter);
    };

    const selectedOptions = entityFilter[fieldName] ? options.filter((v: any) => entityFilter[fieldName].includes(v.value ? 1 : 0)) : [];

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
                onShow={() => console.info("asdasd")}
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
