import { Dropdown } from 'primereact/dropdown';
import Label from 'src/layouts/components/Label';

import { Context, ReactElement, useContext } from 'react';

interface IDropdownValue {
 name: string;
 label: string;
}
interface IProps {
    entityContext: Context<any>;
    precision?: number;
    labelPos?: "top" | "left";
    filterKey: string;
    name?: string;
    label?: string | ReactElement;
}

const FilterSpecified = ({ entityContext: EntityContext, label, name, filterKey }: IProps) => {
    const { entityFilter, setEntityFilter } = useContext(EntityContext);
    const fieldName = `${filterKey}.specified`;


    const dropdownValues: IDropdownValue[] = [
      { name: 'not-specified', label: 'Not Specified' },
      { name: 'true', label: 'Yes' },
      { name: 'false', label: 'No' }
  ];

    const handleChange = (value: IDropdownValue) => {
        const _entityFilter = { ...entityFilter };
        _entityFilter[fieldName] = '';
        if (['true', 'false'].includes(`${value.name}`)) {
            _entityFilter[fieldName] = value;
        } else {
            delete _entityFilter[fieldName];
        }

        setEntityFilter(_entityFilter);
    };

    const value = ['true', 'false'].includes(entityFilter[fieldName]) ? entityFilter[fieldName] : 'not-specified';

    return (
        <>
            <Label>{label}</Label>
            <Dropdown value={value} onChange={(e) => handleChange(e.value)} options={dropdownValues} optionLabel="label" placeholder="Select" />
        </>
    );
};

export default FilterSpecified;
