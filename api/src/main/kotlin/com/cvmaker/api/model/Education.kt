package com.cvmaker.api.model

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.NotBlank
import java.time.LocalDate

data class Education(
    @field:NotBlank(message = "university name must not be blank")
    @field:JsonProperty(value = "universityName")
    override val name: String,

    @field:NotBlank(message = "degree must not be blank")
    @field:JsonProperty(value = "degree")
    override val subName: String,

    override val city: String?,

    override val startDate: LocalDate,

    override val endDate: LocalDate?,

    override val description: String?,
) : Background
