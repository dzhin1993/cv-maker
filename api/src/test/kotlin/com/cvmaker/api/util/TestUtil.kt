package com.cvmaker.api.util

import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.ResultActions

fun <T> readFromJson(action: ResultActions, clazz: Class<T>): T {
    return readValue(getContent(action.andReturn()), clazz)
}

fun <T> readListFromJsonMvcResult(result: MvcResult, clazz: Class<T>): Iterable<T> {
    return readValues(getContent(result), clazz)
}

fun getContent(result: MvcResult): String {
    return result.response.contentAsString
}