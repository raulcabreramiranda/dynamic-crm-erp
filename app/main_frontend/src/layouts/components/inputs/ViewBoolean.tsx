import { useState } from 'react'
import Grid, { GridSize } from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import { Context, useContext } from 'react'
import { Label } from 'mdi-material-ui'
import { Typography } from '@mui/material'

interface Props {
  entityContext: Context<any>
  options: any[]
  name: string
  label: string
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
