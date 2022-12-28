import { DateTimePicker, TimePicker, DesktopDatePicker, MobileDatePicker } from '@mui/lab'
import dayjs, { Dayjs } from 'dayjs'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'

interface Props extends BaseTextFieldProps {
  entityContext: Context<any>
  precision?: number
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

const InputDate = ({ entityContext: EntityContext, label, placeholder, name, dateType }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

 
  const handleChange = (value: Dayjs | null) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = value ? value.format() : undefined
    setEntityEdit(_entityEdit)
  }

  return (
    <>
      {dateType === 'DesktopDate' && <DesktopDateComponent label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
      {dateType === 'MobileDate' && <MobileDateComponent label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
      {dateType === 'Time' && <TimeComponent label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
      {dateType === 'DateTime' && <DateTimeComponent label={label} value={entityEdit[fieldName]} handleChange={handleChange} />}
    </>
  )
}

export default InputDate
