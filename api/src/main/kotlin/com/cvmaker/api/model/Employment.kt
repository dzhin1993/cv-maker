package com.cvmaker.api.model

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.NotBlank
import java.time.LocalDate

data class Employment(
    @field:NotBlank(message = "company name must not be blank")
    @field:JsonProperty(value = "companyName")
    override val name: String,

    @field:NotBlank(message = "position must not be blank")
    @field:JsonProperty(value = "position")
    override val subName: String,

    override val startDate: LocalDate,

    override val endDate: LocalDate?,

    override val city: String?,

    override val description: String?
) : Background
