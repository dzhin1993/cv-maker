import React from 'react'
import {FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {EmailInputFormGroupProps} from '../../model/props'
import {isEmailInvalid} from '../../util/inputValidator'

const EmailInputFormGroup: React.FC<EmailInputFormGroupProps> = (
    {value, onChange}
) => {
    return (
        <FormGroup>
            <Label for="email">Email</Label>
            <Input
                invalid={isEmailInvalid(value)}
                onChange={onChange}
                type="email" id="email" name="email"
                value={value}
            />
            <FormFeedback>
                {value ? "Email is not valid" : "Email must not be empty"}
            </FormFeedback>
        </FormGroup>
    )
}

export default EmailInputFormGroup