import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import StyledInputFormGroup from './StyledInputFormGroup'
import {updateProperties} from '../../feutures/resumeInputSlice'

const SkillsInputForm: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleChange = (value?: string) => {
        dispatch(updateProperties({name: "skills", value}))
    }

    return (
        <>
            <h5 className="heading-title">Skills:</h5>
            <StyledInputFormGroup
                id="skills" label="Skills"
                placeholder={"Enter your skills"}
                value={resume.skills}
                dontShowLabel onChange={handleChange}
            />
        </>
    );
}

export default SkillsInputForm