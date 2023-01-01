import Grid, { GridSize } from '@mui/material/Grid'
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import { ReactElement } from 'react'
import { Context, useContext } from 'react'
import { BASE_API_VERSION_PATH } from 'src/util/constants'
import { assestBasePath } from 'src/util/entity-utils'


interface Props {
  entityContext: Context<any>
  id?: string
  name?: string
  label?: string | ReactElement
  widthPreview: string
  heightPreview: string
}

const ViewImage = ({ name,  widthPreview, heightPreview, entityContext: EntityContext }: Props) => {
  const { entityView } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''


  const ImgStyled = styled('img')(({ theme }) => ({
    width: widthPreview,
    height: heightPreview,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
  }))

  return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ImgStyled src={assestBasePath(entityView[fieldName])} alt='Profile Pic' />
      </Box>
  )
}

export default ViewImage
