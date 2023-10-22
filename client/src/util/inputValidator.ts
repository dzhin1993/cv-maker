import {Certification, Education, Employment, Language, Resume} from '../model/resume'

export const isResumeInvalid = (resume: Resume): boolean => {
    const {
        title,
        name,
        position,
        contact,
        experiences,
        educations,
        certifications,
        languages,
    } = resume

    return isInvalidProperties(title, name, position, contact.email)
        || isInValidExperience(experiences)
        || isInValidEducations(educations)
        || isInValidCertifications(certifications)
        || isInValidLanguages(languages)
}

const isInvalidProperties = (
    title: string,
    name: string,
    position: string,
    email: string
) => {
    return !title.trim() || !name.trim()
        || !position.trim() || !email.trim();
}

const isInValidExperience = (experiences: Employment[]): boolean => {
    for (const experience of experiences) {
        const {companyName, position} = experience
        if (!companyName.trim() || !position.trim()) {
            return true
        }
    }
    return false
}

const isInValidEducations = (educations: Education[]): boolean => {
    for (const education of educations) {
        const {universityName, degree} = education
        if (!universityName.trim() || !degree.trim()) {
            return true
        }
    }
    return false
}

const isInValidCertifications = (certifications: Certification[]): boolean => {
    for (const certification of certifications) {
        const {institution, name} = certification
        if (!institution.trim() || !name.trim()) {
            return true
        }
    }
    return false
}

const isInValidLanguages = (languages: Language[]): boolean => {
    for (const language of languages) {
        const {languageName} = language
        if (!languageName.trim()) {
            return true
        }
    }
    return false
}

const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
)

export const isEmailInvalid = (value: string): boolean => {
    return !value.trim() || !emailRegExp.test(value)
}

export const isInValidDateRange = (startDate?: Date, endDate?: Date): boolean => {
    if (startDate && endDate) {
        return startDate > endDate
    }
    return false
}