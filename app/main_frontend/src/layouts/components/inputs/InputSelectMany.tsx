import { useState, Context, useContext, useEffect, SyntheticEvent } from 'react'
import Grid, { GridSize } from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils'

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc'
}
interface Props extends SelectProps {
  entityContext: Context<any>
  options: any[]
  relationshipType: string
  optionsLink: string
  optionsSort: IEntityListSort
  optionsShowFields: string[]
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
const InputSelectRelationship = (props: Props) => {
  const manyTypesRelationships = ['one-to-many', 'many-to-many']
  if (manyTypesRelationships.includes(props.relationshipType)) return <InputSelectMany {...props} />
  return <InputSelectOne {...props} />
}

const InputSelectMany = ({ name, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const [options, setOptions] = useState<IOption[] | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (event: SyntheticEvent, value: IOption[]) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = value
    setEntityEdit(_entityEdit)
  }

  const handleOpen = () => {
    setOpen(true)
    if (options === undefined) {
      apiGet(optionsLink, {
        filters: {},
        size: 100,
        sort: optionsSort,
        selectColumns: ['id', ...optionsShowFields.filter(v => v !== 'id')],
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
  return (
    <FormControl fullWidth>
      <Autocomplete
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
      />
    </FormControl>
  )
}

const InputSelectOne = ({ name, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const [options, setOptions] = useState<IOption[] | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (event: SyntheticEvent, value: IOption[]) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = value
    setEntityEdit(_entityEdit)
  }

  const handleOpen = () => {
    setOpen(true)
    if (options === undefined) {
      apiGet(optionsLink, {
        filters: {},
        size: 100,
        sort: optionsSort,
        selectColumns: ['id', ...optionsShowFields.filter(v => v !== 'id')],
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
  return (
    <FormControl fullWidth>
      <Autocomplete
        fullWidth
        id='tags-outlined'
        options={!!options && options.length > 0 ? options : []}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={loading}
        value={entityEdit[fieldName] || []}
        onChange={handleChange}
        getOptionLabel={option => optionsShowFields.map((v: string) => option[v]).join(' | ') || option['id']}
        filterSelectedOptions
        renderInput={params => <TextField {...params} InputLabelProps={{ shrink: true }} label={label} />}
      />
    </FormControl>
  )
}

export default InputSelectRelationship
