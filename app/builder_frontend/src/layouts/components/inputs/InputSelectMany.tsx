import { useState, Context, useContext, useEffect, SyntheticEvent, ReactElement } from 'react';
import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils';
import { MultiSelect } from 'primereact/multiselect';
import Label from 'src/layouts/components/Label';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
interface Props {
    entityContext: Context<any>;
    options: any[];
    relationshipType: string;
    optionsLink: string;
    labelPos?: 'top' | 'left';
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
                    setOptions(response['data'] || []);
                }
            });
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    const loading = open && options === undefined;
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>

                <MultiSelect
                    id={`input-multiselect-${fieldName}`}
                    value={entityEdit[fieldName] || []}
                    onChange={(e) => handleChange(e.value)}
                    options={!!options && options.length > 0 ? options : []}
                    optionLabel="label"
                    placeholder="Select Countries"
                    filter
                    display="chip"
                    itemTemplate={itemTemplate}
                />

                {/*  <Autocomplete
        fullWidth
        multiple
        id='tags-outlined'
        options={!!options && options.length > 0 ? options : []}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={loading}
        value={entityEdit[fieldName] || []}
        onChange={handleChange}
        getOptionLabel={option => {
          if (optionsShowFields.length > 0) {
            return optionsShowFields.map((v: string) => showFieldsSelectAsync(option,v)).join(' | ')
          }
          return option['id']
        }}
        filterSelectedOptions
        renderInput={params => <TextField {...params} InputLabelProps={{ shrink: true }} label={label} />}
      /> */}
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
    const handleClose = () => {
        setOpen(false);
    };

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    const loading = open && options === undefined;
    return (
        <div className={labelPos === 'top' ? `p-fluid` : ``}>
            <div className="field">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                <MultiSelect
                    id={`input-multiselect-${fieldName}`}
                    multiple={false}
                    value={entityEdit[fieldName] || []}
                    onChange={(e) => handleChange(e.value)}
                    options={!!options && options.length > 0 ? options : []}
                    optionLabel="label"
                    placeholder="Select Countries"
                    filter
                    display="chip"
                    itemTemplate={itemTemplate}
                />
                {/*        <Autocomplete
                fullWidth
                id="tags-outlined"
                options={!!options && options.length > 0 ? options : []}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                loading={loading}
                value={entityEdit[fieldName] || []}
                onChange={handleChange}
                getOptionLabel={(option) => optionsShowFields.map((v: string) => option[v]).join(' | ') || option['id']}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} label={label} />}
            /> */}
            </div>
        </div>
    );
};

export default InputSelectRelationship;
