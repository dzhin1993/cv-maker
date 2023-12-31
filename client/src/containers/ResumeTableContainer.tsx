import React from 'react'
import {Col, Container, Row} from 'reactstrap'
import ResumeTable from '../components/table/ResumeTable'
import ResumeCreateDropdown from '../components/dropdown/ResumeCreateDropdown'
import ResumeCreateModal from '../components/modal/ResumeCreateModal'

const ResumeTableContainer = () => {
    return <Container>
        <ResumeCreateModal/>
        <Row>
            <Col style={{textAlign: "center"}}>
                <h2>Your resumes</h2>
            </Col>
        </Row>
        <Row className="centralized" style={{width: 900}}>
            <Col>
                <ResumeCreateDropdown/>
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