import { Tag } from 'primereact/tag';
import {Context, useContext, ReactElement } from 'react'


import { apiGet, showFieldsSelectAsync } from 'src/util/entity-utils'
import Typography from '../Typography'

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc';
}
interface Props  {
  entityContext: Context<any>
  options: any[]
  relationshipType: string
  id?: string
  name: string
  label: string | ReactElement
  optionsLink: string
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

const ViewSelectMany = ({ name, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields }: Props) => {
  const { entityView } = useContext(EntityContext)
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
      <Typography variant='subtitle1' sx={{ mr: 2 }}>
            <b>{label}: {' '}</b> 
      </Typography>
      <Typography variant='subtitle2' sx={{ mr: 2 }}>
          {processValue(entityView[fieldName])}
      </Typography>
    </>
  )
}
export default ViewSelectMany
