package com.cvmaker.api.model

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document("Resumes")
data class Resume(
    @Id
    var id: String?,

    var userEmail: String?,

    @field:NotBlank(message = "title must not be blank")
    val title: String,

    @field:NotBlank(message = "name must not be blank")
    val name: String,

    @field:NotBlank(message = "position must not be blank")
    val position: String,

    val created: LocalDate,

    val contact: Contact,

    var imageId: String?,

    val skills: String?,

    val summary: String?,

    @field:Valid
    val experiences: List<Employment>,

    @field:Valid
    val educations: List<Education>,

    @field:Valid
    val certifications: List<Certification>,

    @field:Valid
    val languages: List<Language>,
)
