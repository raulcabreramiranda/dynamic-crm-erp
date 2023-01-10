import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { Input } from '@mui/material'
import { useState } from 'react'
import { showFieldsSelectAsync } from 'src/util/entity-utils'

type IOption = {
  [key: string]: any
}

export default function EnhancedTable({ options,reLoadList, optionsSuperSelect, handleSelectAll, handleSelect, selected }: any) {
  const [filters, setFilters] = useState({} as any)

  if (options === undefined) {
    return <TableContainer></TableContainer>
  }

  const isSelected = (id: number) => {
    return selected.map((v: any) => v.id).indexOf(id) !== -1
  }

  const onChangeInput = (name: string, value: string) => {
    const _filters = { ...filters }
    _filters[name] = value

    if (_filters[name].length === 0) {
      delete _filters[name]
    }
    setFilters(_filters)
    reLoadList(_filters)
  }

  const numSelected = selected.length
  const rowCount = options.length

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox color='primary' indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={handleSelectAll} />
              </TableCell>
              {optionsSuperSelect.map((headCell: string, i: number) => (
                <TableCell key={i} align={'left'} padding={'none'} sortDirection={false}>
                  <Input onChange={e => onChangeInput(headCell, e.target.value)} value={filters[headCell] || ''} placeholder={headCell} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {options.map((option: any) => {
              const isItemSelected = isSelected(option.id)
              return (
                <TableRow hover onClick={event => handleSelect(event, option)} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={option.id} selected={isItemSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox color='primary' checked={isItemSelected} />
                  </TableCell>
                  {optionsSuperSelect.map((headCell: string, i: number) => (
                    <TableCell key={i} align={'left'} padding={'none'} sortDirection={false}>
                      {showFieldsSelectAsync(option, headCell)}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
