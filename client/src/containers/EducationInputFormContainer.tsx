import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'reactstrap'
import {RootState} from '../store'
import CardWrapper from '../components/wrapper/CardWrapper'
import EducationInputForm from '../components/input/EducationInputForm'
import {addEducation, removeEducation} from '../feutures/resumeInputSlice'

const EducationInputFormContainer: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleAddEducation = () => {
        dispatch(addEducation())
    }

    const handleRemoveEducation = (index: number) => {
        dispatch(removeEducation(index))
    }

    return (
        <>
            <h5 className="heading-title">Education:</h5>
            <Button outline onClick={handleAddEducation} color="primary" type="button">add one more</Button>
            {resume.educations.map((education, index) =>
                <CardWrapper key={index} handleRemove={() => handleRemoveEducation(index)}>
                    <>
                        <EducationInputForm education={education} index={index}/>
                    </>
                </CardWrapper>
            )}
        </>
    );
}

export default EducationInputFormContainer