import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {RootState} from '../../store'
import {toggleModal} from '../../feutures/resumeCreateModalSlice'
import {setData} from '../../feutures/resumeInputSlice'
import {getResume} from '../../api/resumeApi'

const ResumeCreateModal: React.FC = () => {
    const isOpen = useSelector((state: RootState) => state.resumeCreateModal.isOpen)
    const resumes = useSelector((state: RootState) => state.resumeTable.resumes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleToggle = () => {
        dispatch(toggleModal())
    }

    const handleSelect = (id: string) => {
        getResume(id)
            .then(({data}) => {
                const copy = {...data, id: undefined, imageId: undefined}
                dispatch(setData(copy))
                navigate('/create')
            })

    }
    return (
        <div>
            <Modal isOpen={isOpen} toggle={handleToggle}>
                <ModalHeader toggle={() => handleToggle()}>
                    Choose template
                </ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {resumes &&
                            resumes.map(({id, title}) =>
                                <ListGroupItem
                                    key={id} tag="button" action
                                    onClick={() => handleSelect(id)}
                                >
                                    {title}
                                </ListGroupItem>
                            )
                        }
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={() => handleToggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ResumeCreateModal