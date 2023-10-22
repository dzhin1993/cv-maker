import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'reactstrap'
import {RootState} from '../store'
import CardWrapper from '../components/wrapper/CardWrapper'
import EmploymentInputForm from '../components/input/EmploymentInputForm'
import {addExperience, removeExperience} from '../feutures/resumeInputSlice'

const ExperienceInputFormContainer: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleAddExperience = () => {
        dispatch(addExperience())
    }

    const handleRemoveExperience = (index: number) => {
        dispatch(removeExperience(index))
    }

    return (
        <>
            <h5 className="heading-title">Experience:</h5>
            <Button outline onClick={handleAddExperience} color="primary" type="button">add one more</Button>
            {resume.experiences.map((employment, index) =>
                <CardWrapper key={index} handleRemove={() => handleRemoveExperience(index)}>
                    <EmploymentInputForm employment={employment} index={index}/>
                </CardWrapper>
            )}
        </>
    )
}

export default ExperienceInputFormContainer