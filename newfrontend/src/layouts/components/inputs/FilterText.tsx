import Grid, { GridSize } from '@mui/material/Grid'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'
import FilterSpecified from './FilterSpecified'

interface Props extends BaseTextFieldProps {
  entityContext: Context<any>
  precision?: number
  type: string
  filterKey: string
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
}

const handleChangeByType: any = {
  text: (v: string) => v,
  number: (v: string) => v.replace(/\D/g, ''),
  float: (v: string) => v.replace(/[^\d.-]/g, '')
}

const FilterText = ({ entityContext: EntityContext, label, placeholder, name, type, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)

  if (filterMethod === 'specified') return <FilterSpecified label={label} entityContext={EntityContext} filterKey={filterKey} />

  const fieldName = `${filterKey}.${filterMethod}`
  const fieldType = Object.keys(handleChangeByType).includes(type) ? type : 'text'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = handleChangeByType[fieldType](event.target.value)
    setEntityFilter(_entityFilter)
  }

  return (
      <TextField InputLabelProps={{ shrink: true }} onChange={handleChange} fullWidth name={fieldName} label={label} placeholder={placeholder} value={entityFilter[fieldName] || ''} />
  )
}

export default FilterText
