import React, {ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'reactstrap'
import {RootState} from '../../store'
import TextInputFormGroup from './TextInputFormGroup'
import {updateContact} from '../../feutures/resumeInputSlice'
import EmailInputFormGroup from './EmailInputFormGroup'

const ContactDataInputForm: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(updateContact({name, value}))
    }

    const {email, location, phone} = resume.contact
    return (
        <>
            <h5 className="heading-title">Contact data:</h5>
            <Row>
                <Col>
                   <EmailInputFormGroup value={email} onChange={handleChange}/>
                </Col>
                <Col>
                    <TextInputFormGroup
                        id="phone" label="Phone"
                        value={phone} onChange={handleChange}
                    />
                </Col>
            </Row>
            <TextInputFormGroup
                id="location" label="Location"
                value={location} onChange={handleChange}
            />
        </>
    )
}

export default ContactDataInputForm