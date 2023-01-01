import { Context, ReactElement, useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Filter from 'mdi-material-ui/Filter'
import InputSuperSelectTableMany from './InputSuperSelectTableMany'
import InputSuperSelectTableOne from './InputSuperSelectTableOne'
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
  label: string | ReactElement
  name: string
}

const ModalSuperSelect = ({ name, relationshipType, label, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields, optionsSuperSelect }: Props) => {
  const { entityEdit, setEntityEdit } = useContext(EntityContext)
  const fieldName = typeof name !== 'undefined' ? name : ''

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IOption[] | undefined>(undefined)

  const manyTypesRelationships = ['one-to-many', 'many-to-many']
  const isMany = manyTypesRelationships.includes(relationshipType)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _entityEdit = { ...entityEdit }

    if (event.target.checked) {
      _entityEdit[fieldName] = options
    } else {
      delete _entityEdit[fieldName]
    }

    setEntityEdit(_entityEdit)
  }

  const handleSelectMany = (event: React.ChangeEvent<HTMLInputElement>, value: IOption) => {
    const _entityEdit = { ...entityEdit }

    if (!_entityEdit[fieldName] || _entityEdit[fieldName].length === 0) {
      _entityEdit[fieldName] = [value]
    } else if (_entityEdit[fieldName].map((v: any) => v.id).includes(value.id)) {
      _entityEdit[fieldName] = _entityEdit[fieldName].filter((v: any) => v.id !== value.id)
    } else {
      _entityEdit[fieldName] = [...(_entityEdit[fieldName] || []), value]
    }

    if (_entityEdit[fieldName].length === 0) {
      delete _entityEdit[fieldName]
    }
    setEntityEdit(_entityEdit)
  }

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, value: IOption) => {
    const _entityEdit = { ...entityEdit }
    _entityEdit[fieldName] = value
    setEntityEdit(_entityEdit)
  }
  console.info({ entityEdit })

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
          {isMany && <InputSuperSelectTableMany options={options} reLoadList={reLoadList} optionsSuperSelect={optionsSuperSelect} selected={entityEdit[fieldName] || []} handleSelect={handleSelectMany} handleSelectAll={handleSelectAll} />}
          {!isMany && <InputSuperSelectTableOne options={options} reLoadList={reLoadList} optionsSuperSelect={optionsSuperSelect} selected={entityEdit[fieldName] || []} handleSelect={handleSelectOne} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalSuperSelect
