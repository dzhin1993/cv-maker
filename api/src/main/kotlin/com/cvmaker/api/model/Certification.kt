package com.cvmaker.api.model

import jakarta.validation.constraints.NotBlank
import java.time.LocalDate

data class Certification(
    @field:NotBlank(message = "institution must not be blank")
    val institution: String,

    @field:NotBlank(message = "course name must not be blank")
    val name: String,

    val link: String?,

    val completionDate: LocalDate,
)
