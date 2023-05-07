import { useState, Context, useContext, useEffect, SyntheticEvent, ReactElement } from 'react';
import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils';
import { MultiSelect } from 'primereact/multiselect';
import Label from 'src/layouts/components/Label';
import { Dropdown } from 'primereact/dropdown';
import InputSelectEmbedded from './InputSelectEmbedded';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
interface Props {
    entityContext: Context<any>;
    options: any[];
    relationshipType: string;
    optionsLink: string;
    labelPos?: 'top' | 'left';
    id?: string;
    name: string;
    label: string | ReactElement;
    optionsSort: IEntityListSort;
    optionsShowFields: string[];
    formLayoutIsEmbebed?: boolean;
    formLayoutEmbebedView?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

type IOption = {
    [key: string]: any;
};
const InputSelectRelationship = (props: Props) => {
    const manyTypesRelationships = ['one-to-many', 'many-to-many'];
    if (manyTypesRelationships.includes(props.relationshipType)) return <InputSelectEmbedded {...props} />;
    if (manyTypesRelationships.includes(props.relationshipType)) return <InputSelectMany {...props} />;
    return <InputSelectOne {...props} />;
};

const InputSelectMany = ({ name, label, labelPos, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';

    const [options, setOptions] = useState<IOption[] | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);

    const handleChange = (value: IOption[]) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[fieldName] = value;
        setEntityEdit(_entityEdit);
    };
    const handleClose = (value: IOption) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[fieldName] = _entityEdit[fieldName].filter((v: any) => v.id !== value.id);
        setEntityEdit(_entityEdit);
    };

    const handleOpen = () => {
        setOpen(true);
        if (options === undefined) {
            apiGet(optionsLink, {
                filters: {},
                size: 100,
                sort: optionsSort,
                selectColumns: ['id', ...optionsShowFields.filter((v) => v !== 'id')],
                onSuccess: (response) => {
                    setOptions(response['data'] || []);
                }
            });
        }
    };

    const selectedItemTemplate = (option: any) => {
        return (
            <div className="p-multiselect-token">
                <span className="p-multiselect-token-label">
                    {optionsShowFields.map((v, i) => (
                        <>
                            {i > 0 && <>&nbsp;|&nbsp;</>}
                            <span>{showFieldsSelectAsync(option, v)}</span>
                        </>
                    ))}
                </span>
                <span className="p-multiselect-token-icon pi pi-times-circle" onClick={() => handleClose(option)}></span>
            </div>
        );
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                {optionsShowFields.map((v, i) => (
                    <>
                        {i > 0 && <>&nbsp;|&nbsp;</>}
                        <span>{showFieldsSelectAsync(option, v)}</span>
                    </>
                ))}
            </div>
        );
    };

    const value = entityEdit[fieldName] || [];
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>

                <MultiSelect
                    id={`input-multiselect-${fieldName}`}
                    value={value}
                    onFilter={() => console.info('onFilter')}
                    onShow={() => handleOpen()}
                    onChange={(e) => handleChange(e.value)}
                    options={!!options && options.length > 0 ? options : [...value]}
                    optionLabel="label"
                    placeholder="Select"
                    filter
                    display="chip"
                    itemTemplate={itemTemplate}
                    selectedItemTemplate={selectedItemTemplate}
                />
            </div>
        </div>
    );
};

const InputSelectOne = ({ name, label, labelPos, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';

    const [options, setOptions] = useState<IOption[] | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);

    const handleChange = (value: IOption[]) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[fieldName] = value;
        setEntityEdit(_entityEdit);
    };

    const handleOpen = () => {
        setOpen(true);
        if (options === undefined) {
            apiGet(optionsLink, {
                filters: {},
                size: 100,
                sort: optionsSort,
                selectColumns: ['id', ...optionsShowFields.filter((v) => v !== 'id')],
                onSuccess: (response) => {
                    setOptions(response['data'] || []);
                }
            });
        }
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                {optionsShowFields.map((v, i) => (
                    <>
                        {i > 0 && <>&nbsp;|&nbsp;</>}
                        <span>{showFieldsSelectAsync(option, v)}</span>
                    </>
                ))}
            </div>
        );
    };

    const loading = open && options === undefined;
    const value = entityEdit[fieldName] || {};

    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                <Dropdown
                    id={`input-select-${fieldName}`}
                    value={value}
                    onShow={() => handleOpen()}
                    onChange={(e) => handleChange(e.value)}
                    options={!!options && options.length > 0 ? options : [value]}
                    optionLabel="label"
                    placeholder="Select"
                    filter
                    itemTemplate={itemTemplate}
                    valueTemplate={itemTemplate}
                />
            </div>
        </div>
    );
};

export default InputSelectRelationship;
