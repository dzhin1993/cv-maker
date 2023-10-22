package com.cvmaker.api.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.ObjectReader
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule

private val mapper = ObjectMapper()
    .registerModule(JavaTimeModule())
    .registerModule(KotlinModule.Builder().build())

fun <T> readValues(json: String, clazz: Class<T>): List<T> {
    val reader: ObjectReader = mapper.readerFor(clazz)
    return reader.readValues<T>(json).readAll()
}

fun <T> readValue(json: String, clazz: Class<T>): T {
    return mapper.readValue(json, clazz)
}

fun <T> writeValue(obj: T): String {
    return mapper.writeValueAsString(obj)
}