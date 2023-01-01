import { TextareaAutosize } from '@mui/material'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'

interface Props extends BaseTextFieldProps {
  entityContext: Context<any>
  precision?: number
  type: string
}

const handleChangeByType: any = {
  text: (v: string) => v,
  number: (v: string) => v.replace(/\D/g, ''),
  float: (v: string) => v.replace(/[^\d.-]/g, '')
}

const InputText = ({ entityContext: EntityContext, label, placeholder, name, type }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''
  const fieldType = Object.keys(handleChangeByType).includes(type) ? type : 'text'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = handleChangeByType[fieldType](event.target.value)
    setEntityEdit(_entityEdit)
  }

  const props =  {
    InputLabelProps:{ shrink: true },
    onChange: handleChange,
    fullWidth: true, 
    label:label, 
    placeholder: placeholder,
    value: entityEdit[fieldName] || ''
  }
  if (type === 'textarea') {
    return <TextField multiline rows={5} type={type} {...props} />
  }
  return <TextField type={type} {...props} />
}

export default InputText
