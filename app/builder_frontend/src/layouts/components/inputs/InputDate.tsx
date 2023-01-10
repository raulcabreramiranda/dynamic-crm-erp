
import { Context, useContext, ReactElement } from 'react';
import { Calendar } from 'primereact/calendar';
import Label from '../Label';

interface Props {
    entityContext: Context<any>;
    precision?: number;
    label?: string | ReactElement;
    placeholder?: string;
    name: string;
    labelPos?: 'top' | 'left';
    dateType: 'Date' | 'Time' | 'DateTime';
}

const DateComponent = ({ label, value, handleChange }: any) => {
    return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon />;
};

const TimeComponent = ({ label, value, handleChange }: any) => {
    return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon showTime showSeconds />;
};

const DateTimeComponent = ({ label, value, handleChange }: any) => {
    return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon />;
};

const InputDate = ({ entityContext: EntityContext, label, labelPos, name, dateType }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';

    const handleChange = (value: Date) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[fieldName] = value ? value.toISOString() : undefined;
        setEntityEdit(_entityEdit);
    };

    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                {dateType === 'Date' && <DateComponent id={`input-date-${fieldName}`} label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
                {dateType === 'Time' && <TimeComponent id={`input-time-${fieldName}`} label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
                {dateType === 'DateTime' && <DateTimeComponent id={`input-datetime-${fieldName}`} label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
            </div>
        </div>
    );
};

export default InputDate;
