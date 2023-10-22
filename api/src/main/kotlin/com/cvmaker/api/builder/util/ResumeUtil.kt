package com.cvmaker.api.builder.util

import com.itextpdf.layout.element.Div
import com.itextpdf.layout.element.Paragraph
import java.time.LocalDate
import java.time.format.DateTimeFormatter

private const val PRESENT = "Present"

val DATE_FORMATTER = DateTimeFormatter.ofPattern("LLL yyyy")!!

fun buildDate(date: LocalDate): Paragraph {
    return Paragraph(DATE_FORMATTER.format(date))
}

fun buildPeriod(start: LocalDate, end: LocalDate?): Paragraph {
    val startDate = DATE_FORMATTER.format(start)
    val endDate = end?.run { DATE_FORMATTER.format(end) } ?: PRESENT
    return Paragraph("$startDate - $endDate")
}

fun buildDescriptionContainer(title: String, subtitle: String): Div {
    val paragraph = Paragraph(title)
        .setBold()
        .setMarginBottom(0f)
    val subParagraph = Paragraph(subtitle)
        .setMarginTop(0f)
    return Div().add(paragraph).add(subParagraph)
}

fun buildDateContainer(
    start: LocalDate,
    end: LocalDate?,
    city: String?
): Div {
    val location = Div()
    val workPeriod = buildPeriod(start, end)
        .setMarginBottom(0f)
    location.add(workPeriod)
    city?.let {
        val companyLocation = Paragraph(it)
            .setMarginTop(0f)
        location.add(companyLocation)
    }
    return location
}