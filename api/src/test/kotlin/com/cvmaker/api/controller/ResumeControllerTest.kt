package com.cvmaker.api.controller

import com.cvmaker.api.model.Resume
import com.cvmaker.api.repository.ResumeRepository
import com.cvmaker.api.util.*
import jakarta.annotation.PostConstruct
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringBootTest
@ContextConfiguration
@WebAppConfiguration
class ResumeControllerTest {

    @Autowired
    private lateinit var context: WebApplicationContext

    @Autowired
    private lateinit var resumeService: ResumeRepository

    private lateinit var mvc: MockMvc

    @PostConstruct
    fun setup() {
        mvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply<DefaultMockMvcBuilder>(springSecurity())
            .build()
    }

    @BeforeEach
    fun init() {
        resumeService.save(testResume)
    }

    @AfterEach
    fun cleanup() {
        resumeService.deleteResumeByIdAndUserEmail(RESUME_ID, USER_EMAIL)
    }

    @Test
    fun getAll() {
        performWithAuth(get("/resumes"))
            .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(resumeViewMatcher.contentJson(listOf(testResumeView)))
    }

    @Test
    fun get() {
        performWithAuth(get("/resumes/${RESUME_ID}"))
            .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(resumeMatcher.contentJson(testResume))

    }

    @Test
    fun delete() {
        performWithAuth(delete("/resumes/${RESUME_ID}"))
            .andExpect(status().isNoContent)
        assertNull(resumeService.getByIdAndUserEmail(RESUME_ID, USER_EMAIL))
    }

    @Test
    fun create() {
        val resumeNew = getResumeNew()
        val resultAction = performWithAuth(
            post("/resumes")
                .contentType(APPLICATION_JSON)
                .content(writeValue(resumeNew))
        )
            .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
            .andExpect(status().isOk)
        val created = readFromJson(resultAction, Resume::class.java)
        val createdId = created.id
        resumeNew.id = createdId
        resumeMatcher.assertMatch(created, resumeNew)

        resumeService.deleteResumeByIdAndUserEmail(createdId!!, USER_EMAIL)
    }

    @Test
    fun update() {
        val resumeUpdated = getResumeUpdated()
        val resultAction = performWithAuth(
            put("/resumes/${RESUME_ID}")
                .contentType(APPLICATION_JSON)
                .content(writeValue(resumeUpdated))
        )
            .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
            .andExpect(status().isOk)
        val updated = readFromJson(resultAction, Resume::class.java)
        resumeMatcher.assertMatch(updated, resumeUpdated)

        resumeService.deleteResumeByIdAndUserEmail(updated.id!!, USER_EMAIL)
    }

    private fun performWithAuth(mockMvcBuilder: MockHttpServletRequestBuilder) =
        mvc.perform(mockMvcBuilder.with(authentication(getAuthentication())))
}