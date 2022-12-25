import { useState } from 'react'
import Grid, { GridSize } from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import { Context, useContext } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'
import FilterSpecified from './FilterSpecified'

interface Props extends SelectProps {
  entityContext: Context<any>
  options: any[]
  filterKey: string
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
}

const FilterSelect = ({ options, name, label, entityContext: EntityContext, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />

  const handleChange = (event: SyntheticEvent, value: any[]) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = value

    if (_entityFilter[fieldName] === 0) {
      delete _entityFilter[fieldName]
    }
    setEntityFilter(_entityFilter)
  }

  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>{label}</InputLabel>
      <Autocomplete
        fullWidth
        multiple
        id='tags-outlined'
        options={!!options && options.length > 0 ? options : []}
        value={entityFilter[fieldName] || []}
        onChange={handleChange}
        getOptionLabel={option => option['label']}
        filterSelectedOptions
        renderInput={params => <TextField {...params} style={{ backgroundColor: '#fff' }} />}
      />
    </FormControl>
  )
}

export default FilterSelect
