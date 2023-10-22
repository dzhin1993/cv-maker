import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'reactstrap'
import {RootState} from '../store'
import CardWrapper from '../components/wrapper/CardWrapper'
import LanguageInputForm from '../components/input/LanguageInputForm'
import {addLanguage, removeLanguage} from '../feutures/resumeInputSlice'

const LanguageInputFormContainer: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleAddLanguage = () => {
        dispatch(addLanguage())
    }

    const handleRemoveLanguage = (index: number) => {
        dispatch(removeLanguage(index))
    }

    return (
        <>
            <h5 className="heading-title">Languages:</h5>
            <Button outline onClick={handleAddLanguage} color="primary" type="button">add one more</Button>
            {resume.languages.map((language, index) =>
                <CardWrapper key={index} handleRemove={() => handleRemoveLanguage(index)}>
                    <LanguageInputForm language={language} index={index}/>
                </CardWrapper>
            )}
        </>
    )
}

export default LanguageInputFormContainer