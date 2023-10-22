import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {toggle} from '../../feutures/errorHandlerSlice'
import {RootState} from '../../store'

const ErrorModal: React.FC = () => {
    const {isError, message} = useSelector((state: RootState) => state.errorHandler.error);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggle())
    }

    return (
        <div>
            <Modal className="error-modal" isOpen={isError} toggle={handleToggle}>
                <ModalHeader className="error-modal-header" toggle={() => handleToggle()}>
                    An Error occurred
                </ModalHeader>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={() => handleToggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ErrorModal