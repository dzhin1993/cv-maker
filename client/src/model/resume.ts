export interface ResumeView {
    id: string;
    title: string
    created: Date
}

export interface Resume {
    [key: string]: string | undefined | Contact | Date | Array<Employment | Education | Certification | Language>
    id?: string
    title: string
    imageId?: string
    created: Date
    name: string
    position: string;
    contact: Contact;
    skills?: string;
    experiences: Array<Employment>;
    educations: Array<Education>;
    certifications: Array<Certification>;
    summary?: string;
    languages: Array<Language>;
}

export interface Contact {
    [key: string]: string | undefined;
    email: string;
    location?: string;
    phone?: string;
}

export interface Employment {
    [key: string]: string | Date | undefined;
    companyName: string;
    position: string;
    city?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
}

export interface Education {
    [key: string]: string | Date | undefined;
    universityName: string,
    degree: string,
    city?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
}

export interface Certification {
    [key: string]: string | Date | undefined;
    institution: string;
    name: string;
    link?: string;
    completionDate?: Date;
}

export interface Language {
    [key: string]: string | undefined;
    languageName: string;
    level?: string;
}

export const getEmploymentDefault = (): Employment => ({
    companyName: "",
    position: "",
    city: "",
});

export const getEducationDefault = (): Education => ({
    universityName: "",
    degree: "",
    city: "",
});

export const getCertificationDefault = (): Certification => ({
    name: "",
    institution: "",
    link: "",
});

export const getLanguageDefault = (): Language => ({
    languageName: "",
    level: ""
});

export const resumeDefault: Resume = {
    name: "",
    position: "",
    title: "",
    contact: {
        location: "",
        phone: "",
        email: ""
    },
    created: new Date(),
    experiences: [],
    educations: [],
    certifications: [],
    languages: [],
}