import Typography from '../Typography'

interface Props {
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
