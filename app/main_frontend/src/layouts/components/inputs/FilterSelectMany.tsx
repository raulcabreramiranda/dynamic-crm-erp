import { useState, Context, useContext, useEffect, SyntheticEvent, ReactElement } from 'react'

import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils'
import FilterSpecified from './FilterSpecified'
import { MultiSelect } from 'primereact/multiselect';
import Label from 'src/layouts/components/Label'

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc'
}
interface Props {
  entityContext: Context<any>
  options: any[]
  id: string
  relationshipType: string
  labelPos?: "top" | "left";
  optionsLink: string
  optionsSort: IEntityListSort
  optionsShowFields: string[]
  filterKey: string
  label: string | ReactElement
  name: string | ReactElement
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

type IOption = {
  [key: string]: any
}
const FilterSelectMany = ({ name, relationshipType, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const [options, setOptions] = useState<IOption[] | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />

  const handleChange = (value: IOption[]) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = value

    if (_entityFilter[fieldName] === 0) {
      delete _entityFilter[fieldName]
    }
    setEntityFilter(_entityFilter)
  }

  const handleOpen = () => {
    setOpen(true)
    if (options === undefined) {
      apiGet(optionsLink, {
        filters: {},
        size: 100,
        sort: optionsSort,
        selectColumns: ['id', ...optionsShowFields.filter(v=>v!=="id")],
        onSuccess: response => {
          setOptions(response['data'] || [])
        }
      })
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const loading = open && options === undefined


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
                onChange={(e) => handleChange(e.value)}
                options={!!options && options.length > 0 ? options : []}
                optionLabel="label"
                placeholder="Select"
                filter
                display="chip"
                itemTemplate={itemTemplate}
            />

{/*       <Autocomplete
        fullWidth
        multiple
        id='tags-outlined'
        options={!!options && options.length > 0 ? options : []}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={loading}
        value={entityFilter[fieldName] || []}
        onChange={handleChange}
        getOptionLabel={option => {
          if (optionsShowFields.length > 0) {
            return optionsShowFields.map((v: string) => showFieldsSelectAsync(option,v)).join(' | ')
          }
          return option['id']
        }}
        filterSelectedOptions
        renderInput={params => <TextField {...params} />}
      /> */}
    </>
  )
}

export default FilterSelectMany
