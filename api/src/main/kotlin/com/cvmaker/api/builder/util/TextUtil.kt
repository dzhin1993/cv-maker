package com.cvmaker.api.builder.util

import com.itextpdf.html2pdf.HtmlConverter
import com.itextpdf.io.font.constants.StandardFonts
import com.itextpdf.io.image.ImageDataFactory
import com.itextpdf.kernel.font.PdfFont
import com.itextpdf.kernel.font.PdfFontFactory
import com.itextpdf.kernel.pdf.action.PdfAction
import com.itextpdf.layout.borders.Border
import com.itextpdf.layout.borders.SolidBorder
import com.itextpdf.layout.element.*

val EMPTY = Cell()

fun htmlToPdf(html: String): List<IElement> {
    return HtmlConverter.convertToElements(html, getConverterProperties())
}

fun createFont(): PdfFont {
    return PdfFontFactory.createFont(StandardFonts.HELVETICA_OBLIQUE)
}

fun buildImage(imageContent: ByteArray): Image? {
    return try {
        Image(ImageDataFactory.create(imageContent)).setAutoScale(true)
    } catch (e: Exception) {
        null
    }
}

fun buildLink(text: String, url: String): Paragraph {
    return Paragraph(
        Link(text, PdfAction.createURI(url))
            .setUnderline()
    )
        .setMarginTop(0f)
        .setMarginBottom(0f)
}

fun wrapToImageCell(image: Image): Cell {
    return Cell()
        .add(image)
        .setBorder(Border.NO_BORDER)
}

fun wrapToColumnSpanNoBorderCell(element: IBlockElement): Cell {
    return Cell(1, 2)
        .add(element)
        .setBorder(Border.NO_BORDER)
}

fun wrapToNoBorderCell(element: IBlockElement?): Cell {
    return Cell()
        .add(element)
        .setBorder(Border.NO_BORDER)
}

fun wrapToBottomBorderCell(element: IBlockElement): Cell {
    return wrapToNoBorderCell(element)
        .setBorderBottom(SolidBorder(1f))
}

fun getHeadingBoldTitle(text: String): Paragraph {
    return Paragraph(text)
        .setBold()
        .setFontSize(12f)
}