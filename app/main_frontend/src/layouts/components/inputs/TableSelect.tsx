
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import { Context, useContext } from 'react'
import { Label } from 'mdi-material-ui'
import { Typography } from '@mui/material'


interface Props extends SelectProps {
  entityView: any
  name: string
}

const TableSelect = ({ entityView, name}: Props) => {
  const fieldName = typeof name !== 'undefined' ? name : ''

  return (
    <>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {entityView[fieldName]}
      </Typography>
    </>
  )
}

export default TableSelect
