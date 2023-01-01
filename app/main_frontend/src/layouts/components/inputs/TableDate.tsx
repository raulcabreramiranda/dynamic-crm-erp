import { Typography } from '@mui/material'
import Grid, { GridSize } from '@mui/material/Grid'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'

interface Props extends BaseTextFieldProps {
  entityView: any
  name: string
  format: string
}

const TableDate = ({ entityView, name }: Props) => {
  const fieldName = typeof name !== 'undefined' ? name : ''

  return (
    <>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {entityView[fieldName]}
      </Typography>
    </>
  )
}

export default TableDate
