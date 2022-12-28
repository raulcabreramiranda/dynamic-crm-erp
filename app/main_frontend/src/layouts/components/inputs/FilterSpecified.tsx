import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'

interface Props extends BaseTextFieldProps {
  entityContext: Context<any>
  precision?: number
  filterKey: string
}

const FilterSpecified = ({ entityContext: EntityContext, label, placeholder, name, type, filterKey }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.specified`

  const handleChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = ''
    if (['true', 'false'].includes(`${event.target.value}`)) {
      _entityFilter[fieldName] = event.target.value
    } else {
      delete _entityFilter[fieldName]
    }

    setEntityFilter(_entityFilter)
  }

  const value = (['true', 'false'].includes(entityFilter[fieldName])) ? entityFilter[fieldName] : 'not-specified'
  return (
    <FormControl fullWidth>
      <InputLabel id={'filter-specified-label-' + name}>{label}</InputLabel>
      <Select labelId={'filter-specified-label-' + name} value={value} onChange={handleChange} input={<OutlinedInput />}>
        <MenuItem value={'not-specified'}>Not Specified</MenuItem>
        <MenuItem value={'true'}>Yes</MenuItem>
        <MenuItem value={'false'}>No</MenuItem>
      </Select>
    </FormControl>
  )
}

export default FilterSpecified
