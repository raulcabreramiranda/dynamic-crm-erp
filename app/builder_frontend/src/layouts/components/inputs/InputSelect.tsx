import Label from 'src/layouts/components/Label';
import { Dropdown } from 'primereact/dropdown';
import { ReactElement, Context, useContext } from 'react';

interface Props {
    entityContext: Context<any>;
    options: any[];
    labelPos?: 'top' | 'left';
    id: string;
    name: string;
    label: string | ReactElement;
}

const InputSelect = ({ options, name, label, entityContext: EntityContext, labelPos }: Props) => {
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
                <Label htmlFor={`input-select-${fieldName}`}>{label}</Label>
                <Dropdown id={`input-select-${fieldName}`} value={entityEdit[fieldName]} onChange={(e) => handleChange(e.value)} options={options} optionLabel="label" placeholder="Select" />
            </div>
        </div>
    );
};

export default InputSelect;
