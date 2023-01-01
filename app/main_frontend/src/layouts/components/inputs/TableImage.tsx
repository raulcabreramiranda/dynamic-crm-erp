import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { assestBasePath } from 'src/util/entity-utils'




interface Props {  
  entityView: any
  name: string
  widthPreview: string
  heightPreview: string
}

const TableImage = ({ name, widthPreview, heightPreview, entityView }: Props) => {
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

export default TableImage
