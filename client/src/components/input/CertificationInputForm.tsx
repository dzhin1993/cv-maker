import React, {ChangeEvent} from 'react'
import {useDispatch} from 'react-redux'
import {Col, Container, FormGroup, Row} from 'reactstrap'
import {CertificationInputFormProps} from '../../model/props'
import TextInputFormGroup from './TextInputFormGroup'
import DateInputForm from './DateInputForm'
import {updateCertification} from '../../feutures/resumeInputSlice'
import ValidatedTextInputFormGroup from './ValidatedTextInputFormGroup'

const CertificationInputForm: React.FC<CertificationInputFormProps> = (
    {certification, index}
) => {
    const dispatch = useDispatch()

    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(updateCertification(
            {index, value: {name, value}}
        ))
    }

    const handleChangeDate = (value?: Date) => {
        dispatch(updateCertification(
            {index, value: {name: "completionDate", value}}
        ))
    }

    const {completionDate, name, link, institution} = certification;
    return (
        <>
            <Row>
                <Col xs={4}>
                    <ValidatedTextInputFormGroup
                        id="institution" label="Institution"
                        value={institution} onChange={handleChange}
                    />
                </Col>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="name" label="Course name"
                        value={name} onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputFormGroup
                        id="link" label="Link"
                        placeholder={"Put a link to the certificate"}
                        value={link} onChange={handleChange}
                    />
                </Col>
                <Col xs={3}>
                    <FormGroup row>
                        <Container>
                            <DateInputForm
                                id="completionDate" label="Completion Date"
                                value={completionDate}
                                onChange={handleChangeDate}
                            />
                        </Container>
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default CertificationInputForm