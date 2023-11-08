package com.cvmaker.api.builder.util

import com.itextpdf.html2pdf.ConverterProperties
import com.itextpdf.html2pdf.attach.impl.tags.SpanTagWorker
import com.itextpdf.html2pdf.css.apply.ICssApplier
import com.itextpdf.html2pdf.css.apply.ICssApplierFactory
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider
import com.itextpdf.kernel.font.PdfFont
import com.itextpdf.layout.element.Text
import com.itextpdf.layout.font.FontProvider
import com.itextpdf.layout.properties.Property.*
import com.itextpdf.layout.properties.RenderingMode
import com.itextpdf.layout.properties.UnitValue

private const val SYMBOL = "•"
private const val UL_TAG = "ul"
private const val P_TAG = "p"
private const val STRONG_TAG = "strong"

fun getConverterProperties(): ConverterProperties {
    val converterProperties = ConverterProperties()
    val fontProvider: FontProvider = DefaultFontProvider(false, false, false)
    val bold: PdfFont = createFont()
    fontProvider.addFont(bold.fontProgram)
    converterProperties.fontProvider = fontProvider

    converterProperties.cssApplierFactory = ICssApplierFactory { element ->
        when {
            element.name().equals(UL_TAG) -> {
                return@ICssApplierFactory listCssApplier
            }
            element.name().equals(P_TAG) -> {
                return@ICssApplierFactory paragraphCssApplier
            }
            element.name().equals(STRONG_TAG) -> {
                return@ICssApplierFactory strongCssApplier
            }
            else -> ICssApplier { _, _, _ -> }
        }
    }
    return converterProperties
}

val listCssApplier = ICssApplier { _, stylesContainer, tagWorker ->
    val container = tagWorker.elementResult
    container.setProperty(LIST_SYMBOL, Text(SYMBOL))
    container.setProperty(LIST_SYMBOL_INDENT, 5f)
    container.setProperty(RENDERING_MODE, RenderingMode.DEFAULT_LAYOUT_MODE)
    container.setProperty(MARGIN_LEFT, UnitValue.createPointValue(10f))
    stylesContainer.styles = emptyMap()
}

val paragraphCssApplier = ICssApplier {_, stylesContainer, tagWorker ->
    val container = tagWorker.elementResult
    container.setProperty(RENDERING_MODE, RenderingMode.DEFAULT_LAYOUT_MODE)
    container.setProperty(MARGIN_LEFT, UnitValue.createPointValue(5f))
    stylesContainer.styles = emptyMap()
}

val strongCssApplier = ICssApplier {_, stylesContainer, tagWorker ->
    val allElements = (tagWorker as SpanTagWorker).allElements
    allElements[0].setProperty(BOLD_SIMULATION, true)
    stylesContainer.styles = emptyMap()
}


