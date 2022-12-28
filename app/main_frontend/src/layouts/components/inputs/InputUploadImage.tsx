import Grid, { GridSize } from '@mui/material/Grid'
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import { ReactElement } from 'react'
import { Context, useContext } from 'react'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface Props {
  entityContext: Context<any>
  id?: string
  name?: string
  label?: string | ReactElement
}

const InputUploadImage = ({ name, entityContext: EntityContext }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ImgStyled src={imgSrc} alt='Profile Pic' />
        <Box>
          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
            Upload New Photo
            <input hidden type='file' onChange={onChange} accept='image/png, image/jpeg' id='account-settings-upload-image' />
          </ButtonStyled>
          <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
            Reset
          </ResetButtonStyled>
          <Typography variant='body2' sx={{ marginTop: 5 }}>
            Allowed PNG or JPEG. Max size of 800K.1
          </Typography>
        </Box>
      </Box>
  )
}

export default InputUploadImage
