package com.cvmaker.api.service

import com.cvmaker.api.builder.buildResume
import com.cvmaker.api.exception.NotFoundException
import com.cvmaker.api.model.Resume
import com.cvmaker.api.model.dto.ResumeView
import com.cvmaker.api.repository.ResumeRepository
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service

@Service
class ResumeService(
    private val resumeRepository: ResumeRepository,
    private val imageService: ImageService,
) {
    fun create(resume: Resume, email: String): Resume {
        resume.id?.let { throw IllegalArgumentException("id must be new (id = null)") }
        resume.userEmail = email
        return resumeRepository.save(resume)
    }

    fun update(resume: Resume, id: String, email: String): Resume {
        resume.id?.let {
            if (it != id) {
                throw IllegalArgumentException("request body must be with id=$id")
            }
        }
        resume.id = id
        resume.userEmail = email
        return get(id, email).let { resumeRepository.save(resume) }
    }

    fun delete(id: String, email: String) {
        val resume = get(id, email)
        resume.imageId?.let { imageService.delete(it) }
        resumeRepository.deleteResumeByIdAndUserEmail(id, email)
    }

    fun get(id: String, email: String): Resume {
        return resumeRepository.getByIdAndUserEmail(id, email)
            ?: throw NotFoundException("resume by id $id is not found")
    }

    fun getAll(email: String): List<ResumeView> {
        return resumeRepository.getAllByUserEmail(email)
            .map { ResumeView(it.id, it.title, it.created) }
    }

    fun buildDocument(id: String, email: String): Resource {
        val resume = get(id, email)
        val imageContent = resume.imageId
            ?.let { imageService.getImageResource(it) }
            ?.contentAsByteArray
        return ByteArrayResource(buildResume(resume, imageContent).toByteArray())
    }
}
