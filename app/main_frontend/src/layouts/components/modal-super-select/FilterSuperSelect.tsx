import { Context, ReactElement, useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Filter from 'mdi-material-ui/Filter'
import FilterSuperSelectTable from './FilterSuperSelectTable'
import { apiGet } from 'src/util/entity-utils'

type IOption = {
  [key: string]: any
}

export interface IEntityListSort {
  [key: string]: 'asc' | 'desc'
}

interface Props {
  id: string
  entityContext: Context<any>
  options: any[]
  relationshipType: string
  optionsLink: string
  optionsSort: IEntityListSort
  optionsShowFields: string[]
  optionsSuperSelect: string[]
  filterKey: string
  label: string | ReactElement
  name: string | ReactElement
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
}

const ModalSuperSelect = ({ name, relationshipType, label, entityContext: EntityContext, optionsLink, optionsSort, optionsSuperSelect, optionsShowFields, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IOption[] | undefined>(undefined)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _entityFilter = { ...entityFilter }

    if (event.target.checked) {
      _entityFilter[fieldName] = options
    } else {
      delete _entityFilter[fieldName]
    }

    setEntityFilter(_entityFilter)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, value: IOption) => {
    const _entityFilter = { ...entityFilter }

    if (!_entityFilter[fieldName] || _entityFilter[fieldName].length === 0) {
      _entityFilter[fieldName] = [value]
    } else if (_entityFilter[fieldName].map((v: any) => v.id).includes(value.id)) {
      _entityFilter[fieldName] = _entityFilter[fieldName].filter((v: any) => v.id !== value.id)
    } else {
      _entityFilter[fieldName] = [...(_entityFilter[fieldName] || []), value]
    }

    if (_entityFilter[fieldName].length === 0) {
      delete _entityFilter[fieldName]
    }
    setEntityFilter(_entityFilter)
  }

  const handleOpen = () => {
    setOpen(true)
    reLoadList({})
  }

  const reLoadList = (filters: any) => {
    const _filters: any = {}
    Object.keys(filters).forEach((v: string) => {
      _filters[`${v}.contains`] = filters[v]
    })
    const selectColumns = ['id', ...optionsShowFields, ...optionsSuperSelect]
    apiGet(optionsLink, {
      filters: _filters,
      size: 100,
      sort: optionsSort,
      selectColumns: selectColumns.filter((v: string, i: number) => selectColumns.indexOf(v) === i),
      onSuccess: response => {
        setOptions(response['data'] || [])
      }
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} style={{ float: 'right' }}>
        <Filter />
      </Button>
      <Dialog open={open} onClose={handleClose} scroll={'body'} aria-labelledby={`scroll-dialog-title-${fieldName}`} aria-describedby='scroll-dialog-description'>
        <DialogTitle id={`scroll-dialog-title-${fieldName}`}>{label}</DialogTitle>
        <DialogContent dividers={false}>
          <FilterSuperSelectTable options={options} reLoadList={reLoadList} optionsSuperSelect={optionsSuperSelect} handleSelectAll={handleSelectAll} handleSelect={handleSelect} selected={entityFilter[fieldName] || []} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalSuperSelect
