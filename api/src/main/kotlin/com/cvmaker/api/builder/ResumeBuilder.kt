package com.cvmaker.api.builder

import com.cvmaker.api.builder.util.*
import com.cvmaker.api.model.*
import com.cvmaker.api.util.withNotNullOrEmpty
import com.itextpdf.io.font.constants.StandardFonts
import com.itextpdf.kernel.font.PdfFontFactory
import com.itextpdf.kernel.pdf.PdfDocument
import com.itextpdf.kernel.pdf.PdfWriter
import com.itextpdf.layout.Document
import com.itextpdf.layout.borders.Border
import com.itextpdf.layout.element.*
import com.itextpdf.layout.properties.TextAlignment.CENTER
import java.io.ByteArrayOutputStream

private const val CONTACT = "Contact me"
private const val SKILLS = "Skills"
private const val EXPERIENCE = "Experience"
private const val EDUCATION = "Education"
private const val CERTIFICATES = "Certificates"
private const val LANGUAGES = "Languages"
private const val SUMMARY = "Summary"

fun buildResume(resume: Resume, imageContent: ByteArray?): ByteArrayOutputStream {
    val outputStream = ByteArrayOutputStream()
    val pdfWriter = PdfWriter(outputStream)
    val pdfDocument = PdfDocument(pdfWriter)
    val document = Document(pdfDocument)

    val font = PdfFontFactory.createFont(StandardFonts.HELVETICA)
    document.setFont(font)

    addTitle(document, resume)

    val table = Table(floatArrayOf(80f, 290f), true)
    table.setFontSize(10f)

    addData(table, resume, imageContent)

    document.add(table)
    table.complete()
    document.close()

    return outputStream
}

private fun addTitle(document: Document, resume: Resume) {
    val title = getHeadingBoldTitle(resume.name)
        .setFontSize(18f)
    val position = getHeadingBoldTitle(resume.position)

    val titleCell = Div()
        .add(title.setMarginBottom(0f))
        .add(position.setMarginTop(0f))
        .setTextAlignment(CENTER)
    document.add(titleCell)
}

private fun addData(table: Table, resume: Resume, imageContent: ByteArray?) {
    addPersonalData(table, resume.contact, imageContent)

    addSummary(table, resume.summary)
    resume.skills?.let {
        addSkills(table, resume.skills)
    }
    resume.experiences.withNotNullOrEmpty { addExperience(table, this) }
    resume.educations.withNotNullOrEmpty { addEducation(table, this) }
    resume.certifications.withNotNullOrEmpty { addCertification(table, this) }
    resume.languages.withNotNullOrEmpty { addLanguages(table, this) }
}

private fun addImage(table: Table, imageContent: ByteArray) {
    buildImage(imageContent)
        ?.let { table.addCell(wrapToImageCell(it)) }
}

private fun addPersonalData(table: Table, contact: Contact, imageContent: ByteArray?) {
    val (email, location, phone) = contact

    val contactContainer = Div()
    location?.let { addContactData(contactContainer, location) }
    phone?.let { addContactData(contactContainer, phone) }
    addContactData(contactContainer, email)

    val contactData = Cell()
        .add(getHeadingBoldTitle(CONTACT))
        .add(contactContainer)
        .setBorder(Border.NO_BORDER)

    imageContent?.let {
        addImage(table, imageContent)
        table.addCell(contactData.setPaddingLeft(10f))
    } ?: table.addCell(
        wrapToColumnSpanNoBorderCell(contactData)
            .setTextAlignment(CENTER)
    )
}

private fun addContactData(contactContainer: Div, value: String) {
    contactContainer.add(
        Paragraph(value)
            .setMarginTop(0f)
            .setMarginBottom(0f)
    )
}

private fun addSkills(table: Table, skills: String) {
    addHeadingCell(SKILLS, table)

    val skillsContainer = Div()
        .setMarginTop(5f)
    htmlToPdf(skills).forEach { iElement ->
        skillsContainer.add(iElement as IBlockElement)
    }

    table.addCell(wrapToColumnSpanNoBorderCell(skillsContainer))
}

private fun addExperience(table: Table, experiences: List<Employment>) {
    addHeadingCell(EXPERIENCE, table)
    experiences.forEach {
        addBackground(it, table)
    }
}

private fun addEducation(table: Table, educations: List<Education>) {
    addHeadingCell(EDUCATION, table)
    educations.forEach {
        addBackground(it, table)
    }
}

private fun addBackground(background: Background, table: Table) {
    val location =
        buildDateContainer(background.startDate, background.endDate, background.city)
    table.addCell(wrapToNoBorderCell(location))

    val descriptionContainer =
        buildDescriptionContainer(background.name, background.subName)
    background.description?.let {
        htmlToPdf(it).forEach { iElement ->
            descriptionContainer.add(iElement as IBlockElement)
        }
    }

    table.addCell(wrapToNoBorderCell(descriptionContainer))
}

private fun addCertification(table: Table, courses: List<Certification>) {
    addHeadingCell(CERTIFICATES, table)

    courses.forEach { certification ->
        val (institution, name, link, endDate) = certification
        val completionDate: Paragraph = buildDate(endDate)
            .setMarginTop(0f)
            .setMarginBottom(0f)

        val institutionContainer = Paragraph(institution)
            .setBold()
            .setMarginBottom(0f)
        val nameContainer = link?.let {
            buildLink(name, it)
        } ?: Paragraph(name).setMarginTop(0f)
        val descriptionContainer = Div()
            .add(institutionContainer)
            .add(nameContainer)

        table.addCell(wrapToNoBorderCell(completionDate))
        table.addCell(wrapToNoBorderCell(descriptionContainer))
    }
}

private fun addLanguages(table: Table, languages: List<Language>) {
    addHeadingCell(LANGUAGES, table)

    val languagesString = languages.joinToString(", ")
    { language ->
        val (languageName, level) = language
        val isNotNullOrBlank = level?.isNotBlank() ?: false
        when {
            isNotNullOrBlank -> "$languageName (${level})"
            else -> languageName
        }
    }
    val languagesContainer = Paragraph(languagesString)
        .setMarginLeft(10f)

    table.addCell(wrapToColumnSpanNoBorderCell(languagesContainer))
}

private fun addSummary(table: Table, summary: String?) {
    summary?.let {
        addHeadingCell(SUMMARY, table)
        val summaryContainer = Paragraph()
            .setMarginTop(5f)
        htmlToPdf(summary).forEach { iElement ->
            summaryContainer.add(iElement as IBlockElement)
        }
        table.addCell(wrapToColumnSpanNoBorderCell(summaryContainer))
    }
}

private fun addHeadingCell(title: String, table: Table) {
    val heading = getHeadingBoldTitle(title)
        .setMarginTop(5f)
    table.addCell(wrapToBottomBorderCell(heading))
    table.addCell(wrapToBottomBorderCell(EMPTY))
}