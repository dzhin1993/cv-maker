import React from 'react'
import {useSelector} from 'react-redux'
import {Button, Col, Row, Spinner} from 'reactstrap'
import {FormSubmitButtonProps} from '../../model/props'
import {RootState} from '../../store'
import {isResumeInvalid} from '../../util/inputValidator'

const FormSubmitButton: React.FC<FormSubmitButtonProps> = (
    {submit, isLoading}
) => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)

    return (
        <Row style={{marginTop: 20}}>
            <Col>
                <Button disabled={isResumeInvalid(resume)} onClick={submit} color="primary" type="button">
                    {isLoading && <Spinner size="sm"/>}
                    <span>Create</span>
                </Button>
            </Col>
        </Row>
    )
}

export default FormSubmitButton;