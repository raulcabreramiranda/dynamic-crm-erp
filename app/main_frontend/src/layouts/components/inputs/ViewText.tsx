import Typography from '../Typography'
import { Context, ReactElement, useContext } from 'react'

interface Props{
  entityContext: Context<any>
  precision?: number
  label: string | ReactElement
  name: string
  id?: string
  type?: string
}

const InputText = ({ entityContext: EntityContext, label, name }: Props) => {
  const { entityView } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  return (
    <>
      <Typography variant='subtitle1' sx={{ mr: 2 }}>
            <b>{label}</b>
      </Typography>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {entityView[fieldName]}
      </Typography>
    </>
  )
}

export default InputText
