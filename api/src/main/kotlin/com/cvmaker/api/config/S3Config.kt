package com.cvmaker.api.config

import com.amazonaws.auth.AWSCredentials
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class S3Config {

    @Value("\${amazon.s3.accessKey}")
    private lateinit var accessKey: String

    @Value("\${amazon.s3.secretKey}")
    private lateinit var secretKey: String

    companion object {
        const val BUCKET_NAME = "resume-images"
    }

    private fun getCredentials(): AWSCredentials {
        return BasicAWSCredentials(accessKey, secretKey)
    }

    @Bean
    fun buildS3Client(): AmazonS3 {
        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(AWSStaticCredentialsProvider(getCredentials()))
            .withRegion(Regions.EU_CENTRAL_1)
            .build()
    }
}