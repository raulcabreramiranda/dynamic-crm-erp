import { Tag } from 'primereact/tag';
import { ReactElement } from 'react'

import { showFieldsSelectAsync } from 'src/util/entity-utils'
import Typography from '../Typography'

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc';
}
interface Props {
  options: any[]
  entityView: any
  optionsLink: string
  name: string
  relationshipType: string
  optionsSort: IEntityListSort
  optionsShowFields: string[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const TableSelectMany = ({ name, entityView, optionsShowFields }: Props) => {
  const fieldName = typeof name !== 'undefined' ? name : ''

  const processValue = (value: any): ReactElement | ReactElement[] | string => {
    if (Array.isArray(value)) {
      console.info(value)
        return value.map(v=> <Tag value={`${processValue(v)}`} />);
    }
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        if (optionsShowFields.length > 0) { 
          return optionsShowFields.map((v: string) => showFieldsSelectAsync(value,v)).join(' | ')
        }
        return value['id']
    }
    return value
  };

  return (
    <>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {processValue(entityView[fieldName])}
      </Typography>
    </>
  )
}
export default TableSelectMany
