import React, {ChangeEvent} from 'react'
import {Col, Row} from 'reactstrap'
import {useDispatch} from 'react-redux'
import {LanguageInputFormProps} from '../../model/props'
import TextInputFormGroup from './TextInputFormGroup'
import {updateLanguage} from '../../feutures/resumeInputSlice'
import ValidatedTextInputFormGroup from './ValidatedTextInputFormGroup'

const LanguageInputForm: React.FC<LanguageInputFormProps> = (
    {language: {languageName, level}, index}
) => {
    const dispatch = useDispatch()

    const handleChange = (
        {target: {name, value}}: ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(updateLanguage(
            {index, value: {name, value}}
        ))
    }

    return (
        <>
            <Row>
                <Col>
                    <ValidatedTextInputFormGroup
                        id="languageName" label="Language"
                        value={languageName} onChange={handleChange}
                    />
                </Col>
                <Col>
                    <TextInputFormGroup
                        id="level" label="Level"
                        value={level} onChange={handleChange}
                    />
                </Col>
            </Row>
        </>
    )
}

export default LanguageInputForm