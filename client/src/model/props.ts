import {ChangeEvent} from 'react'
import {Certification, Education, Employment, Language, ResumeView} from './resume'
import {ReactNode} from '../util/typesUtil'

export interface ResumeTableRowProps {
    resume: ResumeView
    index: number
}

export interface CardWrapperProps {
    children: ReactNode
    handleRemove: () => void
}

export interface AuthorizationCheckerProps {
    children: ReactNode
}

export interface ResumeInputFormProps {
    submit: () => void
    isLoading: boolean
}

export interface FormSubmitButtonProps {
    submit: () => void
    isLoading: boolean
}

export interface EmailInputFormGroupProps {
    value: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export interface TitleInputFormProps {
    value: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export interface ExperienceInputFormProps {
    employment: Employment
    index: number
}

export interface EducationInputFormProps {
    education: Education
    index: number
}

export interface CertificationInputFormProps {
    certification: Certification
    index: number
}

export interface LanguageInputFormProps {
    language: Language
    index: number
}

export interface DateInputFormProps {
    id: string
    label: string
    value?: Date
    onChange: (value?: Date) => void
    inValid?: boolean
}

export interface DateInputRowProps {
    startDate?: Date
    endDate?: Date
    changeStartDate: (startDate?: Date) => void
    changeEndDate: (endDate?: Date) => void
}

export interface TextInputFormGroupProps {
    id: string
    label: string
    value?: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export interface StyledInputFormGroupProps {
    id: string
    label: string
    value?: string
    onChange: (value?: string) => void
    dontShowLabel?: boolean
    placeholder?: string
}