package com.cvmaker.api.controller

import com.cvmaker.api.model.Resume
import com.cvmaker.api.model.dto.ResumeView
import com.cvmaker.api.security.util.getUserEmail
import com.cvmaker.api.service.ResumeService
import jakarta.validation.Valid
import org.springframework.core.io.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/resumes")
class ResumeController(
    private val resumeService: ResumeService,
) {

    @GetMapping
    fun getAll(): List<ResumeView> {
        return resumeService.getAll(getUserEmail())
    }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): Resume? {
        return resumeService.get(id, getUserEmail())
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    fun delete(@PathVariable("id") id: String) {
        resumeService.delete(id, getUserEmail())
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable("id") id: String,
        @Valid @RequestBody resume: Resume
    ): Resume {
        return resumeService.update(resume, id, getUserEmail())
    }

    @PostMapping
    fun create(@Valid @RequestBody resume: Resume): Resume {
        return resumeService.create(resume, getUserEmail())
    }

    @GetMapping(value = ["/{id}/file"], produces = [MediaType.APPLICATION_PDF_VALUE])
    @ResponseBody
    fun getFileViaByteArrayResource(
        @PathVariable("id") id: String
    ): Resource {
        return resumeService.buildDocument(id, getUserEmail())
    }
}