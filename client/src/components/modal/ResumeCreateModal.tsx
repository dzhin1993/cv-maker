import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {RootState} from '../../store'
import {toggleModal} from '../../feutures/resumeCreateModalSlice'

const ResumeCreateModal: React.FC = () => {
    const isOpen = useSelector((state: RootState) => state.resumeCreateModal.isOpen)
    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleModal())
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={handleToggle}>
                <ModalHeader toggle={() => handleToggle()}>
                    Choose template
                </ModalHeader>
                <ModalBody>
                    Test
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={() => handleToggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ResumeCreateModal