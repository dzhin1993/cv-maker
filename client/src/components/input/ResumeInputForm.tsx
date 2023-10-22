import React from 'react'
import {Container, Form} from 'reactstrap'
import PersonalInfoInputForm from './PersonalInfoInputForm'
import ContactDataInputForm from './ContactDataInputForm'
import SkillsInputForm from './SkillsInputForm'
import ExperienceInputFormContainer from '../../containers/ExperienceInputFormContainer'
import EducationInputFormContainer from '../../containers/EducationInputFormContainer'
import CertificationInputFormContainer from '../../containers/CertificationInputFormContainer'
import SummaryInputForm from './SummaryInputForm'
import LanguageInputFormContainer from '../../containers/LanguageInputFormContainer'
import FormSubmitButton from './FormSubmitButton'
import {ResumeInputFormProps} from '../../model/props'

const ResumeInputForm: React.FC<ResumeInputFormProps> = (
    {isLoading, submit}
) => {
    return (
        <Container className={"centralized"}>
            <Form style={{width: 800}} className={"centralized"}>
                <PersonalInfoInputForm/>
                <ContactDataInputForm/>
                <SkillsInputForm/>
                <SummaryInputForm/>
                <ExperienceInputFormContainer/>
                <EducationInputFormContainer/>
                <CertificationInputFormContainer/>
                <LanguageInputFormContainer/>
                <FormSubmitButton submit={submit} isLoading={isLoading}/>
            </Form>
        </Container>
    )
}

export default ResumeInputForm