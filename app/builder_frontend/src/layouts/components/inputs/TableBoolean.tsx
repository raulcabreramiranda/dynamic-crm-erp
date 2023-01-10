import Typography from '../Typography'

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
