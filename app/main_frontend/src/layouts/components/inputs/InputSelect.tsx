import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import { Context, useContext } from 'react'


interface Props extends SelectProps {
  entityContext: Context<any>
  options: any[]
}

const InputSelect = ({ options, name, label, entityContext: EntityContext}: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const handleChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = event.target.value
    setEntityEdit(_entityEdit)
  }
  return (
      <FormControl fullWidth>
        <InputLabel id={'chip-label-input'+name}>{label}</InputLabel>
        <Select labelId={'chip-label-input'+name} value={entityEdit[fieldName]} onChange={handleChange} 
        input={<OutlinedInput />}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

export default InputSelect
