import React from 'react'
import {Button} from 'reactstrap'
import {RootState} from '../store'
import CardWrapper from '../components/wrapper/CardWrapper'
import CertificationInputForm from '../components/input/CertificationInputForm'
import {useDispatch, useSelector} from 'react-redux'
import {addCertification, removeCertification} from '../feutures/resumeInputSlice'

const CertificationInputFormContainer: React.FC = () => {
    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const dispatch = useDispatch()

    const handleAddCertification = () => {
        dispatch(addCertification())
    }

    const handleRemoveCertification = (index: number) => {
        dispatch(removeCertification(index))
    }

    return (
        <>
            <h5 className="heading-title">Certification:</h5>
            <Button outline onClick={handleAddCertification} color="primary" type="button">add one more</Button>
            {resume.certifications.map((certification, index) =>
                <CardWrapper key={index} handleRemove={() => handleRemoveCertification(index)}>
                    <CertificationInputForm certification={certification} index={index}/>
                </CardWrapper>
            )}
        </>
    )
}

export default CertificationInputFormContainer