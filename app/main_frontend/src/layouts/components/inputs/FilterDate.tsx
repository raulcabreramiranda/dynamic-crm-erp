import { DateTimePicker, TimePicker, DesktopDatePicker, MobileDatePicker } from '@mui/lab'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import dayjs, { Dayjs } from 'dayjs'
import { Context, useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import FilterSpecified from './FilterSpecified'

interface Props extends BaseTextFieldProps {
  entityContext: Context<any>
  precision?: number
  filterKey: string
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
  dateType: 'DesktopDate' | 'MobileDate' | 'Time' | 'DateTime'
}

const DesktopDateComponent = ({ label, value, handleChange }: any) => {
  return <DesktopDatePicker label={label} inputFormat='DD/MM/YYYY' value={value ? dayjs(value) : null} onChange={handleChange} renderInput={(params: any) => <TextField {...params} />} />
}

const MobileDateComponent = ({ label, value, handleChange }: any) => {
  return <MobileDatePicker label={label} inputFormat='DD/MM/YYYY' value={value ? dayjs(value) : null} onChange={handleChange} renderInput={params => <TextField {...params} />} />
}

const TimeComponent = ({ label, value, handleChange }: any) => {
  return <TimePicker label={label} value={value ? dayjs(value) : null} onChange={handleChange} renderInput={params => <TextField {...params} />} />
}

const DateTimeComponent = ({ label, value, handleChange }: any) => {
  return <DateTimePicker label={label} value={value ? dayjs(value) : null} onChange={handleChange} renderInput={params => <TextField {...params} />} />
}

const FilterDate = (props: Props) => {
  const { entityFilter, setEntityFilter } = useContext(props.entityContext)
  console.info(entityFilter)

  if (props.filterMethod === 'between') return <FilterDateBetween {...props} />

  if (props.filterMethod === 'specified') return <FilterSpecified label={props.label} entityContext={props.entityContext} precision={props.precision} filterKey={props.filterKey} />

  return <FilterDateSimple {...props} />
}

const FilterDateSimple = ({ entityContext: EntityContext, label, placeholder, name, dateType, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const handleChange = (value: Dayjs | null) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = value ? value.format() : undefined
    setEntityFilter(_entityFilter)
  }

  return (
    <Stack spacing={3}>
      {dateType === 'DesktopDate' && <DesktopDateComponent label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
      {dateType === 'MobileDate' && <MobileDateComponent label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
      {dateType === 'Time' && <TimeComponent label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
      {dateType === 'DateTime' && <DateTimeComponent label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
    </Stack>
  )
}

const FilterDateBetween = ({ entityContext: EntityContext, label, placeholder, name, dateType, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const valueStart = entityFilter[fieldName]?.split(',')[0] || null
  const valueEnd = entityFilter[fieldName]?.split(',')[1] || null

  const handleChangeStart = (value: Dayjs | null) => {
    const _entityFilter = { ...entityFilter }
    const valueFormat = value ? value.format() : ''
    console.info({ valueFormat })
    _entityFilter[fieldName] = [valueFormat, valueEnd].join(',')
    setEntityFilter(_entityFilter)
  }

  const handleChangeEnd = (value: Dayjs | null) => {
    const _entityFilter = { ...entityFilter }
    const valueFormat = value ? value.format() : ''
    console.info({ valueFormat })
    _entityFilter[fieldName] = [valueStart, valueFormat].join(',')
    setEntityFilter(_entityFilter)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        {dateType === 'DesktopDate' && <DesktopDateComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
        {dateType === 'MobileDate' && <MobileDateComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
        {dateType === 'Time' && <TimeComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
        {dateType === 'DateTime' && <DateTimeComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
      </Grid>
      <Grid item xs={6}>
        {dateType === 'DesktopDate' && <DesktopDateComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
        {dateType === 'MobileDate' && <MobileDateComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
        {dateType === 'Time' && <TimeComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
        {dateType === 'DateTime' && <DateTimeComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
      </Grid>
    </Grid>
  )
}

export default FilterDate
