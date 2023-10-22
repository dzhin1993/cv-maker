import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

import {
    getCertificationDefault,
    getEducationDefault,
    getEmploymentDefault, getLanguageDefault,
    Resume,
    resumeDefault
} from '../model/resume';

type TextInputPayload = {
    name: string
    value: string | undefined
}

type TextDateInputPayload = {
    name: string
    value: string | Date | undefined
}

type IndexedTextDateInputPayload = {
    index: number
    value: TextDateInputPayload
}

type IndexedTextInputPayload = {
    index: number
    value: TextInputPayload
}


export interface ResumeInputState {
    resume: Resume
}

const initialState: ResumeInputState = {
    resume: resumeDefault,
}

export const resumeInputSlice = createSlice({
        name: 'resumeInput',
        initialState,
        reducers: {
            setData: (state, action: PayloadAction<Resume>) => {
                state.resume = action.payload
            },
            updateProperties: (state, action: PayloadAction<TextInputPayload>) => {
                const {name, value} = action.payload
                const resume = state.resume
                resume[name] = value
            },
            updateContact: (state, action) => {
                const {name, value} = action.payload
                const resume = state.resume
                resume.contact[name] = value
            },
            addExperience: state => {
                const resume = state.resume
                resume.experiences = [getEmploymentDefault(), ...resume.experiences]
            },
            removeExperience: (state, action: PayloadAction<number>) => {
                const resume = state.resume
                resume.experiences = resume.experiences
                    .filter((_, index) => index !== action.payload)
            },
            updateExperience: (state, action: PayloadAction<IndexedTextDateInputPayload>) => {
                const resume = state.resume
                const {index} = action.payload
                resume.experiences = resume.experiences.map((item, i) => {
                    if (i === index) {
                        const {name, value} = action.payload.value
                        item[name] = value
                    }
                    return item
                })
            },
            addEducation: state => {
                const resume = state.resume
                resume.educations = [getEducationDefault(), ...resume.educations]
            },
            removeEducation: (state, action: PayloadAction<number>) => {
                const resume = state.resume
                resume.educations = resume.educations
                    .filter((_, index) => index !== action.payload)
            },
            updateEducation: (state, action: PayloadAction<IndexedTextDateInputPayload>) => {
                const resume = state.resume
                const {index} = action.payload

                resume.educations = resume.educations.map((item, i) => {
                    if (i === index) {
                        const {name, value} = action.payload.value;
                        item[name] = value
                    }
                    return item
                })
            },
            addCertification: state => {
                const resume = state.resume;
                resume.certifications = [getCertificationDefault(), ...resume.certifications]
            },
            removeCertification: (state, action: PayloadAction<number>) => {
                const resume = state.resume
                resume.certifications = resume.certifications
                    .filter((_, index) => index !== action.payload)
            },
            updateCertification: (state, action: PayloadAction<IndexedTextDateInputPayload>) => {
                const resume = state.resume
                const {index} = action.payload
                resume.certifications = resume.certifications.map((item, i) => {
                    if (i === index) {
                        const {name, value} = action.payload.value
                        item[name] = value
                    }
                    return item
                })
            },
            addLanguage: state => {
                const resume = state.resume
                resume.languages = [getLanguageDefault(), ...resume.languages]
            },
            removeLanguage: (state, action: PayloadAction<number>) => {
                const resume = state.resume
                resume.languages = resume.languages
                    .filter((_, index) => index !== action.payload)
            },
            updateLanguage: (state, action: PayloadAction<IndexedTextInputPayload>) => {
                const resume = state.resume
                const {index} = action.payload
                resume.languages = resume.languages.map((item, i) => {
                    if (i === index) {
                        const {name, value} = action.payload.value
                        item[name] = value
                    }
                    return item
                })
            },
        }
    }
)

export const {
    setData,
    updateProperties,
    updateContact,
    addExperience,
    removeExperience,
    updateExperience,
    addEducation,
    removeEducation,
    updateEducation,
    addCertification,
    removeCertification,
    updateCertification,
    addLanguage,
    removeLanguage,
    updateLanguage,
} = resumeInputSlice.actions

export default resumeInputSlice.reducer