import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button, Col, Container, Row} from 'reactstrap'
import ResumeTable from '../components/table/ResumeTable'
import {setData} from '../feutures/resumeInputSlice'
import {resumeDefault} from '../model/resume'

const ResumeTableContainer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCreate = () => {
        dispatch(setData(resumeDefault))
        navigate('/create')
    }

    return <Container>
        <Row>
            <Col style={{textAlign: "center"}}>
                <h2>Your resumes</h2>
            </Col>
        </Row>
        <Row className="centralized" style={{width: 900}}>
            <Col>
                <Button
                    onClick={() => handleCreate()}
                    outline color="primary"
                >
                    Create new
                </Button>
            </Col>

        </Row>
        <Row className="centralized" style={{width: 900}}>
            <Col>
                <ResumeTable/>
            </Col>
        </Row>
    </Container>
}

export default ResumeTableContainer