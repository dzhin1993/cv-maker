import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button} from 'reactstrap'
import {ResumeTableRowProps} from '../../model/props'
import {download, remove} from '../../api/resumeApi';
import {openFileInNewTab} from '../../util/fileUtil'
import {handleError} from '../../util/errorUtil'
import {removeRow} from '../../feutures/resumeTableSlice'

const ResumeTableRow: React.FC<ResumeTableRowProps> = (
    {resume, index}
) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (id: string) => {
        remove(id)
            .then(() => dispatch(removeRow(id)))
            .catch(err => handleError(dispatch, err))
    }

    const handleUpdate = () => {
        navigate(`/${resume.id}/update`)
    }

    const handleDownload = (id: string) => {
        download(id)
            .then(response => {
                openFileInNewTab(response.data)
            })
            .catch(err => handleError(dispatch, err))
    }

    const {id, title, created} = resume
    return (
        <tr key={id}>
            <th scope="row">{index + 1}</th>
            <td>
                <Button color={"link"} onClick={() => handleDownload(id)}>
                    {title}
                </Button>
            </td>
            <td>{created.toString()}</td>
            <td>
                <Button
                    onClick={() => handleUpdate()}
                    outline color="warning"
                >
                    Update
                </Button>
            </td>
            <td>
                <Button
                    onClick={() => handleDelete(id)}
                    outline color="danger"
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default ResumeTableRow