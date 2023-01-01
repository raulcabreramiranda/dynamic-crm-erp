import { Typography } from '@mui/material'
import Grid, { GridSize } from '@mui/material/Grid'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import { Context, useContext } from 'react'

interface Props extends BaseTextFieldProps {
  entityView: any
  name: string
}

const InputText = ({ entityView, name }: Props) => {
  const fieldName = typeof name !== 'undefined' ? name : ''
  // <div dangerouslySetInnerHTML={{ __html: photo.description ? photo.description.replace(/(<([^>]+)>)/gi, '').substring(0, 150) : null }} />
  return (
    <>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {entityView[fieldName]?.substring(0, 150)}
      </Typography>
    </>
  )
}

export default InputText
