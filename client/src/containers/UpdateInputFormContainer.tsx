import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {RootState} from '../store'
import {download, getResume, update} from '../api/resumeApi'
import {openFileInNewTab} from '../util/fileUtil'
import ResumeInputForm from '../components/input/ResumeInputForm'
import ErrorModal from '../components/modal/ErrorModal'
import {handleError} from '../util/errorUtil'
import {useDispatch, useSelector} from 'react-redux'
import {setData} from '../feutures/resumeInputSlice'
import {getImage, remove, upload} from '../api/ImagesApi'
import {setImage} from '../feutures/imageInputSlice'

const UpdateInputFormContainer: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false)

    const resume = useSelector((state: RootState) => state.resumeInput.resume)
    const image = useSelector((state: RootState) => state.imageInput.image)
    const dispatch = useDispatch()

    useEffect(() => {
        const downloadImage = (imageId?: string) => {
            if (imageId) {
                getImage(imageId)
                    .then(res => dispatch(setImage(res.data)))
                    .catch(err => {
                        handleError(dispatch, err)
                    });
            }
            return Promise.resolve()
        }

        if (params.resumeId) {
            setLoading(true);
            getResume(params.resumeId)
                .then(({data}) => {
                    dispatch(setData(data))
                    return downloadImage(data.imageId)
                })
                .then(() => setLoading(false))
                .catch(err => {
                    setLoading(false)
                    handleError(dispatch, err)
                });
        }
    }, [dispatch, params])

    const updateImage = () => {
        if (resume.imageId) {
            remove(resume.imageId)
                .catch(err => {
                    handleError(dispatch, err)
                })
        }
        if (image) {
            return upload(image)
                .then(res => res.data)
                .catch(err => {
                    handleError(dispatch, err)
                })
        }
        return Promise.resolve()
    }

    const handleSubmit = () => {
        setLoading(true)
        updateImage()
            .then(res => {
                const copyResume = {...resume}
                copyResume.imageId = res
                return update(copyResume)
            })
            .then(response => download(response.data.id))
            .then(response => openFileInNewTab(response.data))
            .then(() => navigate("/"))
            .catch(err => {
                setLoading(false)
                handleError(dispatch, err)
            })
    }

    const renderInput = () => (
        <>
            <ErrorModal/>
            <ResumeInputForm isLoading={isLoading} submit={handleSubmit}/>
        </>
    )

    return isLoading ? null : renderInput()
}

export default UpdateInputFormContainer