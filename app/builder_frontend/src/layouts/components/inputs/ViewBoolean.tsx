import { Context, ReactElement, useContext } from 'react'
import Typography from '../Typography'

interface Props {
  entityContext: Context<any>
  options: any[]
  name: string
  label: string | ReactElement
}

const InputSelect = ({ options, label, name, entityContext: EntityContext }: Props) => {
  const { entityView } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const selectedOption = options.filter(v => !!v.value === !!entityView[fieldName]).pop()

  return (
    <>
      <Typography variant='subtitle1' sx={{ mr: 2 }}>
        <b>{label}</b>
      </Typography>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
        {selectedOption.label}
      </Typography>
    </>
  )
}

export default InputSelect
