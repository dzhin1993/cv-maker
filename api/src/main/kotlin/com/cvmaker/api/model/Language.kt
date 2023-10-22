package com.cvmaker.api.model

import jakarta.validation.constraints.NotBlank

data class Language(
    @field:NotBlank(message = "language name must not be blank")
    val languageName: String,

    val level: String?,
)
