import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import ResumeTableRow from './ResumeTableRow'
import {getAll} from '../../api/resumeApi'
import {handleError} from '../../util/errorUtil'
import ErrorModal from '../modal/ErrorModal'
import {setData} from '../../feutures/resumeTableSlice'

const ResumeTable = () => {
    const resumes = useSelector((state: RootState) => state.resumeTable.resumes)
    const dispatch = useDispatch()

    useEffect(() => {
        getAll()
            .then(response => dispatch(setData(response.data)))
            .catch(err => handleError(dispatch, err))
    }, [dispatch])

    return (
        <>
            <ErrorModal/>
            <table className="table table-hover table-hover">
                <thead className={"table-light"}>
                <tr>
                    <th>#</th>
                    <th className={"w-50"}>Title</th>
                    <th className={"w-50"}>Created</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {resumes &&
                    resumes.map((resume, index) =>
                        <ResumeTableRow key={index} resume={resume} index={index}/>
                    )
                }
                </tbody>
            </table>
        </>
    )
}

export default ResumeTable