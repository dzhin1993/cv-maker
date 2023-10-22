import React from 'react'
import {FormGroup, Label} from 'reactstrap'
import ReactQuill from 'react-quill'
import {StyledInputFormGroupProps} from '../../model/props'
import {trimEmptyTags} from '../../util/htmlUtil'

const StyledInputFormGroup: React.FC<StyledInputFormGroupProps> = (
    {id, label, value, placeholder, onChange, dontShowLabel}
) => {
    return (
        <FormGroup>
            <Label style={{display: dontShowLabel ? "none" : ""}} for={id}>
                {label}
            </Label>
            <ReactQuill
                id={id}
                value={value}
                onChange={(v) => onChange(trimEmptyTags(v))}
                placeholder={placeholder}
                modules={{
                    toolbar: [{'list': 'bullet'}],
                }}
            />
        </FormGroup>
    )
}

export default StyledInputFormGroup