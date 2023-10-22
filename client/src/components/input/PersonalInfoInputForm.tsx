import React, {ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'reactstrap'
import {RootState} from '../../store'
import {updateProperties} from '../../feutures/resumeInputSlice'
import ValidatedTextInputFormGroup from './ValidatedTextInputFormGroup'
import TitleInputForm from './TitleInputForm'
import ImageInput from "./ImageInput";

const PersonalInfoInputForm: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(updateProperties({name, value}))
    }

    const {name, title, position} = resume
    return (
        <>

           <TitleInputForm value={title} onChange={handleChange}/>
            <ImageInput/>
            <Row>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="name" label="Full name"
                        value={name} placeholder="Enter your full name"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="position" label="Job title"
                        value={position} placeholder="Enter your wanted position"
                        onChange={handleChange}
                    />
                </Col>
            </Row>
        </>
    )
}

export default PersonalInfoInputForm