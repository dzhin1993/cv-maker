import React from 'react'
import {Label} from 'reactstrap'
import DatePicker from 'react-datepicker'
import {DateInputFormProps} from '../../model/props'
import {convertDate, nullableDateToUndefined} from '../../util/dateUtil'

const  DateInputForm: React.FC<DateInputFormProps> = (
    {id, label, value, onChange, inValid}
) => {
    return (
        <>
            <Label for={id}>{label}</Label>
            <DatePicker
                id={id}
                className={`date-input ${inValid && "date-input-invalid"}`}
                placeholderText="MM / YYYY"
                dateFormat="MM/yyyy" showMonthYearPicker
                selected={convertDate(value)}
                onChange={(date) => onChange(nullableDateToUndefined(date))}
            />
        </>
    )
}

export default DateInputForm