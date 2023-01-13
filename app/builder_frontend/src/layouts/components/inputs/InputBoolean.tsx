import Label from 'src/layouts/components/Label';
import { Dropdown } from 'primereact/dropdown';

import { Context, ReactElement, useContext } from 'react';

interface Props {
    entityContext: Context<any>;
    options: any[];
    labelPos?: 'top' | 'left';
    id?: string;
    name: string;
    label: string | ReactElement;
}

const InputSelect = ({ options, name, label, labelPos, entityContext: EntityContext }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';

    const handleChange = (value: any) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[fieldName] = value;
        setEntityEdit(_entityEdit);
    };
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                <Dropdown id={`input-multiselect-${fieldName}`} value={entityEdit[fieldName]} onChange={(e) => handleChange(e.value)} options={options} optionLabel="label" placeholder="Select" />
            </div>
        </div>
    );
};

export default InputSelect;
