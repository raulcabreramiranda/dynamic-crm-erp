import { useState, Context, useContext, useEffect, SyntheticEvent, ReactElement } from 'react';
import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils';
import { MultiSelect } from 'primereact/multiselect';
import Label from 'src/layouts/components/Label';
import { Dropdown } from 'primereact/dropdown';

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

    const handleOpen = () => {
        setOpen(true);
        if (options === undefined) {
            apiGet(optionsLink, {
                filters: {},
                size: 100,
                sort: optionsSort,
                selectColumns: ['id', ...optionsShowFields.filter((v) => v !== 'id')],
                onSuccess: (response) => {
                    const data = response['data'] || [];
                    setOptions(data.map((v: any) => ({ ...v, label: showFieldsSelectAsync(v, optionsShowFields.join(";")) })));
                }
            });
        }
    };
    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span>{option.label}</span>
            </div>
        );
    };

    const value = (entityEdit[fieldName] || []).map((v: any) => ({ ...v, label: showFieldsSelectAsync(v, optionsShowFields.join(";")) }));
    console.info("value", value)
    console.info("entityEdit[fieldName]", entityEdit[fieldName])
    console.info("options", options)
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
                    options={!!options && options.length > 0 ? options : value}
                    optionLabel="label"
                    placeholder="Select"
                    filter
                    display="chip"
                    itemTemplate={itemTemplate}
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
                    const data = response['data'] || [];
                    setOptions(data.map((v: any) => ({ ...v, label: showFieldsSelectAsync(v, optionsShowFields.join(";")) })));
                }
            });
        }
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span>{option.label}</span>
            </div>
        );
    };

    const value = entityEdit[fieldName] ? { ...entityEdit[fieldName], label: showFieldsSelectAsync(entityEdit[fieldName], optionsShowFields.join(";")) } : {};   
    console.info({value})
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                <Dropdown
                    id={`input-multiselect-${fieldName}`}
                    value={value}
                    options={options || [value]}
                    onFilter={() => console.info('onFilter')}
                    onShow={() => handleOpen()}
                    onChange={(e) => handleChange(e.value)}
                    filter
                    placeholder="Select1"
                    optionGroupTemplate={itemTemplate}
                />
            </div>
        </div>
    );
};

export default InputSelectRelationship;
