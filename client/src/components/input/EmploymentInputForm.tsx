import React, {ChangeEvent} from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row} from 'reactstrap'
import {ExperienceInputFormProps} from '../../model/props'
import StyledInputFormGroup from './StyledInputFormGroup'
import TextInputFormGroup from './TextInputFormGroup'
import DateInputRow from './DateInputRow'
import {updateExperience} from '../../feutures/resumeInputSlice'
import ValidatedTextInputFormGroup from './ValidatedTextInputFormGroup'

const EmploymentInputForm: React.FC<ExperienceInputFormProps> = (
    {employment, index}
) => {
    const dispatch = useDispatch()
    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(updateExperience(
            {index, value: {name, value}}
        ))
    }

    const handleChangeStartDate = (value?: Date) => {
        dispatch(updateExperience(
            {index, value: {name: "startDate", value}}
        ))
    }

    const handleChangeEndDate = (value?: Date) => {
        dispatch(updateExperience(
            {index, value: {name: "endDate", value}}
        ))
    }

    const handleChangeDescription = (value?: string) => {
        dispatch(updateExperience(
            {index, value: {name: "description", value}}
        ))
    }

    const {city, companyName, description, endDate, position, startDate} = employment;
    return (
        <>
            <Row>
                <Col xs={4}>
                    <ValidatedTextInputFormGroup
                        id="companyName" label="Company"
                        value={companyName} onChange={handleChange}
                    />
                </Col>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="position" label="Position"
                        value={position} onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <TextInputFormGroup
                        id="city" label="City"
                        value={city} onChange={handleChange}
                    />
                </Col>
                <DateInputRow
                    startDate={startDate} endDate={endDate}
                    changeStartDate={handleChangeStartDate}
                    changeEndDate={handleChangeEndDate}
                />
            </Row>
            <StyledInputFormGroup
                id="description" label="Description"
                placeholder={"Describe your work experience or write achievements at this place of work"}
                value={description}
                onChange={handleChangeDescription}
            />
        </>
    )
}

export default EmploymentInputForm