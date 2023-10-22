package com.cvmaker.api

import com.cvmaker.api.util.readListFromJsonMvcResult
import org.assertj.core.api.Assertions
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.ResultMatcher

class TestMatcher<T>(private val clazz: Class<T>) {

    fun contentJson(expected: T): ResultMatcher {
        return ResultMatcher { result: MvcResult ->
            assertMatch(readListFromJsonMvcResult(result, clazz), expected)
        }
    }

    fun contentJson(expected: Iterable<T>): ResultMatcher {
        return ResultMatcher { result: MvcResult ->
            assertMatch(readListFromJsonMvcResult(result, clazz), expected)
        }
    }

    fun assertMatch(actual: T, expected: T) {
        Assertions.assertThat(actual).isEqualTo(expected)
    }

    private fun assertMatch(actual: Iterable<T>, vararg expected: T) {
        assertMatch(actual, expected.asList())
    }

    private fun assertMatch(actual: Iterable<T>, expected: Iterable<T>) {
        Assertions.assertThat(actual)
            .usingRecursiveFieldByFieldElementComparator()
            .isEqualTo(expected)
    }
}