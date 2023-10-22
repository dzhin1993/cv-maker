import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../store'
import {create, download} from '../api/resumeApi'
import {openFileInNewTab} from '../util/fileUtil'
import ResumeInputForm from '../components/input/ResumeInputForm'
import ErrorModal from '../components/modal/ErrorModal'
import {handleError} from '../util/errorUtil'
import {useDispatch, useSelector} from 'react-redux'
import {upload} from '../api/ImagesApi'

const CreateInputFormContainer: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false)

    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const image = useSelector((state: RootState) => state.imageInput.image)
    const dispatch = useDispatch()

    const uploadImage = () => {
        if (image) {
            return upload(image)
                .then(res => res.data)
                .catch(err => handleError(dispatch, err))
        }
        return Promise.resolve()
    }

    const handleSubmit = () => {
        setLoading(true)
        uploadImage()
            .then(res => {
                const copyResume = {...resume}
                copyResume.imageId = res
                return create(copyResume)
            })
            .then(response => download(response.data.id))
            .then(response => openFileInNewTab(response.data))
            .then(() => navigate("/"))
            .catch(err => {
                setLoading(false)
                handleError(dispatch, err)
            })
    }

    return (
        <>
            <ErrorModal/>
            <ResumeInputForm isLoading={isLoading} submit={handleSubmit}/>
        </>
    );
}

export default CreateInputFormContainer