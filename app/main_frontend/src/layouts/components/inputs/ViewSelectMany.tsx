import {useState, Context, useContext, useEffect, SyntheticEvent } from 'react'
import Grid, { GridSize } from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import Autocomplete,{AutocompleteProps} from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { apiGet } from 'src/util/entity-utils'
import { Typography } from '@mui/material'

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc';
}
interface Props extends SelectProps {
  entityContext: Context<any>
  options: any[]
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

const ViewSelectMany = ({ name, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
  const { entityView } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''


  const processValue = (value: any): string => {
    if (Array.isArray(value)) {
        return value.map(processValue).join(',');
    }
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        return value[optionsShowFields[0]] || value['id'];
    }
    return value;
};


  return (
    <>
      <Typography variant='subtitle1' sx={{ mr: 2 }}>
            <b>{label}</b>
      </Typography>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {processValue(entityView[fieldName])}
      </Typography>
    </>
  )
}
export default ViewSelectMany
