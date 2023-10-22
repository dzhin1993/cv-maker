import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import StyledInputFormGroup from './StyledInputFormGroup'
import {updateProperties} from '../../feutures/resumeInputSlice'

const SummaryInputForm: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleChange = (value?: string) => {
        dispatch(updateProperties({name: "summary", value}))
    }

    return (
        <>
            <h5 className="heading-title">Summary:</h5>
            <StyledInputFormGroup
                id="summary" label="Summary"
                placeholder={"Enter your professional summary"}
                value={resume.summary}
                dontShowLabel onChange={handleChange}
            />
        </>
    )
}

export default SummaryInputForm