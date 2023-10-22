package com.cvmaker.api.util

import com.cvmaker.api.TestMatcher
import com.cvmaker.api.model.Contact
import com.cvmaker.api.model.Resume
import com.cvmaker.api.model.dto.ResumeView
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import java.time.LocalDate

const val RESUME_ID = "resumeId"
const val USER_EMAIL = "test@email.com"
const val ROLE_USER = "ROLE_USER"
const val TITLE = "title"
const val NAME = "name"
const val POSITION = "position"
val currentDate: LocalDate = LocalDate.now()

fun getAuthentication() = UsernamePasswordAuthenticationToken(
    USER_EMAIL,
    null,
    AuthorityUtils.commaSeparatedStringToAuthorityList(ROLE_USER)
)

val resumeViewMatcher = TestMatcher(ResumeView::class.java)

val testResumeView = ResumeView(RESUME_ID, TITLE, currentDate)

val resumeMatcher = TestMatcher(Resume::class.java)

val testResume =
    Resume(
        RESUME_ID,
        USER_EMAIL,
        TITLE,
        NAME,
        POSITION,
        currentDate,
        Contact(USER_EMAIL, null, null),
        null,
        null,
        null,
        emptyList(),
        emptyList(),
        emptyList(),
        emptyList(),
    )

fun getResumeNew(): Resume {
    return testResume.copy(id = null)
}

fun getResumeUpdated(): Resume {
    return testResume.copy(name = "updated")
}