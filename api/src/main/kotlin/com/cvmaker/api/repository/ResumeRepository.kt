package com.cvmaker.api.repository

import com.cvmaker.api.model.Resume
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface ResumeRepository : MongoRepository<Resume, String> {

    @Query("{'userEmail': ?0}")
    fun getAllByUserEmail(email: String): List<Resume>

    fun getByIdAndUserEmail(id: String, email: String): Resume?

    fun deleteResumeByIdAndUserEmail(id: String, email: String): Int
}