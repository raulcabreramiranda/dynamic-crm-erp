import { ReactElement } from 'react'
import { Context, useContext } from 'react'
import { assestBasePath } from 'src/util/entity-utils'
import Grid from '../Grid'


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

  return (
    <Grid>
        <img
            style={{
                width: widthPreview,
                height: heightPreview,
              //  marginRight: theme.spacing(6.25),
              //  borderRadius: theme.shape.borderRadius
            }}
            src={assestBasePath(entityView[fieldName])}
            alt="Profile Pic"
        />
    </Grid>
  )
}

export default ViewImage
