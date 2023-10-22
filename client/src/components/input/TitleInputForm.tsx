import React from 'react'
import {FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {TitleInputFormProps} from '../../model/props'

const TitleInputForm: React.FC<TitleInputFormProps> = (
    {value, onChange}
) => {
  return (
      <FormGroup>
          <Label
              htmlFor="title" style={{display: "none"}}
              className="form-label"
          >
              Title
          </Label>
          <Input onChange={onChange}
                 className="centralized title-input"
                 type="text" id="title" name="title"
                 placeholder={"Title"} value={value}
                 invalid={!value}
          />
          <FormFeedback style={{textAlign: "center"}}>
              title must not be Empty
          </FormFeedback>
      </FormGroup>
  )
}

export default TitleInputForm;