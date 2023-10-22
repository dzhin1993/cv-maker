package com.cvmaker.api.model.dto

import java.time.LocalDate

data class ResumeView(
    val id: String?,
    val title: String,
    val created: LocalDate,
)