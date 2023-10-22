import React from 'react'
import {FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {TextInputFormGroupProps} from '../../model/props'

const ValidatedTextInputFormGroup: React.FC<TextInputFormGroupProps> = (
    {id, label, value, placeholder, onChange}
) => {
    return (
        <FormGroup>
            <Label for={id}>{label}</Label>
            <Input
                onChange={onChange}
                type="text" id={id} name={id}
                placeholder={placeholder}
                value={value} invalid={!value}
            />
            <FormFeedback>
                {label} must not be Empty
            </FormFeedback>
        </FormGroup>
    )
}

export default ValidatedTextInputFormGroup