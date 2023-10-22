import React, {ChangeEvent} from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row} from 'reactstrap'
import {EducationInputFormProps} from '../../model/props'
import StyledInputFormGroup from './StyledInputFormGroup'
import TextInputFormGroup from './TextInputFormGroup'
import DateInputRow from './DateInputRow'
import {updateEducation} from '../../feutures/resumeInputSlice'
import ValidatedTextInputFormGroup from './ValidatedTextInputFormGroup'

const EducationInputForm: React.FC<EducationInputFormProps> = (
    {education, index}
) => {
    const dispatch = useDispatch()

    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(updateEducation(
            {index, value: {name, value}}
        ))
    }

    const handleChangeStartDate = (value?: Date) => {
        dispatch(updateEducation(
            {index, value: {name: "startDate", value}}
        ))
    }

    const handleChangeEndDate = (value?: Date) => {
        dispatch(updateEducation(
            {index, value: {name: "endDate", value}}
        ))
    }

    const handleChangeDescription = (value?: string) => {
        dispatch(updateEducation(
            {index, value: {name: "description", value}}
        ))
    }

    const {city, universityName, description, endDate, degree, startDate} = education;
    return (
        <>
            <Row>
                <Col xs={4}>
                    <ValidatedTextInputFormGroup
                        id="universityName" label="University"
                        value={universityName} onChange={handleChange}
                    />
                </Col>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="degree" label="Degree"
                        value={degree} onChange={handleChange}
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
                placeholder={"Describe your graduation experience"}
                value={description}
                onChange={handleChangeDescription}
            />
        </>
    )
}

export default EducationInputForm