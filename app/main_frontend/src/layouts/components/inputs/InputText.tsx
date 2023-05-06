import { Context, ReactElement, useContext } from 'react';
import Label from '../Label';
import { InputText as InputTextPrime } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { saveFieldsSelectAsync, showFieldsSelectAsync } from 'src/util/entity-utils';

interface Props {
    entityContext: Context<any>;
    precision?: number;
    id?: string;
    type: string;
    label: string | ReactElement;
    labelPos?: 'top' | 'left';
    placeholder?: string;
    name: string;
}

const handleChangeByType: any = {
    text: (v: string) => v,
    number: (v: string) => v.replace(/\D/g, ''),
    float: (v: string) => v.replace(/[^\d.-]/g, '')
};

const InputText = ({ entityContext: EntityContext, label, placeholder, name, type, labelPos }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';
    const fieldType = Object.keys(handleChangeByType).includes(type) ? type : 'text';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const _entityEdit = { ...entityEdit };
        // _entityEdit[fieldName] = handleChangeByType[fieldType](event.target.value);
        const _entityEdit = saveFieldsSelectAsync({ ...entityEdit }, fieldName, handleChangeByType[fieldType](event.target.value));
        setEntityEdit(_entityEdit);
    };

    const value = showFieldsSelectAsync(entityEdit, fieldName);
    const disabled = (fieldName.split(".").pop()) === 'id';
    if (type === 'textarea') {
        return (
            <div className={labelPos === 'top' ? `p-fluid` : ``}>
                <div className="field">
                    <Label htmlFor={`input-text-${fieldName}`}>{label}</Label>
                    <InputTextarea id={`input-text-${fieldName}`} placeholder="Your Message" autoResize rows={3} cols={30} />
                </div>
            </div>
        );
    }
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-text-${fieldName}`}>{label}</Label>
                <InputTextPrime id={`input-text-${fieldName}`} disabled={disabled} onChange={handleChange} name={fieldName} placeholder={placeholder} value={value || ''} />
            </div>
        </div>
    );
};

export default InputText;
