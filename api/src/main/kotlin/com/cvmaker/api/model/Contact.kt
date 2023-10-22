package com.cvmaker.api.model

import jakarta.validation.constraints.NotBlank

data class Contact(
    @field:NotBlank(message = "email must not be blank")
    val email: String,

    val location: String?,

    val phone: String?,
)
