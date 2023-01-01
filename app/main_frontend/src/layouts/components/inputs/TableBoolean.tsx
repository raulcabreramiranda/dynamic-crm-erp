import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import { Context, useContext } from 'react'
import { Label } from 'mdi-material-ui'
import { Typography } from '@mui/material'

interface Props {
  entityView: any
  name: string
  options: any[]
}

const TableSelect = ({ entityView, name, options }: Props) => {
  const fieldName = typeof name !== 'undefined' ? name : ''
  const selectedOption = options.filter(v => !!v.value === !!entityView[fieldName]).pop()

  return (
    <>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
        {selectedOption.label}
      </Typography>
    </>
  )
}

export default TableSelect
