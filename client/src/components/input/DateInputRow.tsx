import React from 'react'
import {Col, Container, FormGroup} from 'reactstrap'
import {DateInputRowProps} from '../../model/props'
import {isInValidDateRange} from '../../util/inputValidator'
import DateInputForm from './DateInputForm'

const DateInputRow: React.FC<DateInputRowProps> = (
    {startDate, endDate, changeStartDate, changeEndDate}
) => {

    const renderStartDateFeedback = () => {
        if (!startDate) {
            return (
                <div className="text-danger date-feedback">
                    Start date must not be empty
                </div>
            )
        }
    }

    const renderEndDateFeedback = () => {
        if (!endDate) {
            return (
                <div className="text-secondary date-feedback">
                    Leave it blank if this is during the current time
                </div>
            )
        }
        if (isInValidDateRange(startDate, endDate)) {
            return (
                <div className="text-danger date-feedback">
                    End Date must not be less than start Date
                </div>
            )
        }
    }

    return (
        <>
            <Col xs={3}>
                <FormGroup row>
                    <Container>
                        <DateInputForm
                            id="startDate" label="Start Date"
                            value={startDate} onChange={changeStartDate}
                            inValid={!startDate}
                        />
                    </Container>
                    {renderStartDateFeedback()}
                </FormGroup>
            </Col>
            <Col>
                <FormGroup row>
                    <Container>
                        <DateInputForm
                            id="endDate" label="End Date"
                            value={endDate} onChange={changeEndDate}
                            inValid={isInValidDateRange(startDate, endDate)}
                        />
                    </Container>
                    {renderEndDateFeedback()}
                </FormGroup>
            </Col>
        </>
    );
}

export default DateInputRow