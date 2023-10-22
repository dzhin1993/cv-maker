import React from 'react'
import {FormGroup, Input, Label} from 'reactstrap'
import {TextInputFormGroupProps} from '../../model/props'

const TextInputFormGroup: React.FC<TextInputFormGroupProps> = (
    {id, label, value, placeholder, onChange}
) => {
    return (
        <FormGroup>
            <Label for={id}>{label}</Label>
            <Input
                onChange={onChange}
                type="text" id={id} name={id}
                placeholder={placeholder}
                value={value}
            />
        </FormGroup>
    )
}

export default TextInputFormGroup