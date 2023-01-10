
import { Calendar } from 'primereact/calendar';
import Label from '../Label';
import { Context, ReactElement, useContext } from 'react'
import Grid from '../../../layouts/components/Grid';
import FilterSpecified from './FilterSpecified'

interface Props  {
  entityContext: Context<any>
  precision?: number
  filterKey: string
  labelPos?: 'top' | 'left';
  label: string | ReactElement
  filterMethod: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
  dateType: 'Date' | 'Time' | 'DateTime'
}

const DateComponent = ({ label, value, handleChange }: any) => {
  return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon />;
};

const TimeComponent = ({ label, value, handleChange }: any) => {
  return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon showTime showSeconds />;
};

const DateTimeComponent = ({ label, value, handleChange }: any) => {
  return <Calendar id="basic" value={value} onChange={handleChange} dateFormat="dd/mm/yyyy" showIcon />;
};

const FilterDate = (props: Props) => {
  const { entityFilter, setEntityFilter } = useContext(props.entityContext)
  console.info(entityFilter)

  if (props.filterMethod === 'between') return <FilterDateBetween {...props} />

  if (props.filterMethod === 'specified') return <FilterSpecified label={props.label} entityContext={props.entityContext} precision={props.precision} filterKey={props.filterKey} />

  return <FilterDateSimple {...props} />
}

const FilterDateSimple = ({ labelPos, entityContext: EntityContext, label, dateType, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const handleChange = (value: Date) => {
    const _entityFilter = { ...entityFilter }
    _entityFilter[fieldName] = value ? value.toISOString() : undefined
    setEntityFilter(_entityFilter)
  }

  return (
    <div className={labelPos === 'top' ? `p-fluid` : ``}>
    <div className="field">
        <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
        {dateType === 'Date' && <DateComponent id={`input-date-${fieldName}`} label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
        {dateType === 'Time' && <TimeComponent id={`input-time-${fieldName}`} label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
        {dateType === 'DateTime' && <DateTimeComponent id={`input-datetime-${fieldName}`} label={label} value={entityFilter[fieldName]} handleChange={handleChange} />}
    </div>
</div>
);
}

const FilterDateBetween = ({ entityContext: EntityContext, label, dateType, filterKey, filterMethod }: Props) => {
  const { entityFilter, setEntityFilter } = useContext(EntityContext)
  const fieldName = `${filterKey}.${filterMethod}`

  const valueStart = entityFilter[fieldName]?.split(',')[0] || null
  const valueEnd = entityFilter[fieldName]?.split(',')[1] || null

  const handleChangeStart = (value: Date) => {
    const _entityFilter = { ...entityFilter }
    const valueFormat = value ? value.toISOString() : ''
    console.info({ valueFormat })
    _entityFilter[fieldName] = [valueFormat, valueEnd].join(',')
    setEntityFilter(_entityFilter)
  }

  const handleChangeEnd = (value: Date) => {
    const _entityFilter = { ...entityFilter }
    const valueFormat = value ? value.toISOString() : ''
    console.info({ valueFormat })
    _entityFilter[fieldName] = [valueStart, valueFormat].join(',')
    setEntityFilter(_entityFilter)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        {dateType === 'Date' && <DateComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
        {dateType === 'Time' && <TimeComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
        {dateType === 'DateTime' && <DateTimeComponent label={<>{label} (Since)</>} value={valueStart} handleChange={handleChangeStart} />}
      </Grid>
      <Grid item xs={6}>
        {dateType === 'Date' && <DateComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
        {dateType === 'Time' && <TimeComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
        {dateType === 'DateTime' && <DateTimeComponent label={<>{label} (Until)</>} value={valueEnd} handleChange={handleChangeEnd} />}
      </Grid>
    </Grid>
  )
}

export default FilterDate
