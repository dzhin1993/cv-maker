import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import {RootState} from '../../store'
import {toggle} from '../../feutures/dropdownSlice'
import {setData} from '../../feutures/resumeInputSlice'
import {resumeDefault} from '../../model/resume'

const ResumeCreateDropdown: React.FC = () => {
    const isOpen = useSelector((state: RootState) => state.dropdown.dropdownOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreate = () => {
        dispatch(setData(resumeDefault))
        navigate('/create')
    }

    return (
        <Dropdown isOpen={isOpen} toggle={() => dispatch(toggle())}>
            <DropdownToggle outline color="primary">Create new</DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={handleCreate}>Create from scratch</DropdownItem>
                <DropdownItem>Create from existing resume</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ResumeCreateDropdown