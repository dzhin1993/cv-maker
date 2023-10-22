package com.cvmaker.api.service

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.DeleteObjectRequest
import com.amazonaws.services.s3.model.GetObjectRequest
import com.amazonaws.services.s3.model.PutObjectRequest
import com.cvmaker.api.config.S3Config.Companion.BUCKET_NAME
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileOutputStream
import java.util.*

@Service
class ImageService(
    private val s3Client: AmazonS3
) {
    fun getImageResource(id: String): Resource {
        val getObjectRequest = GetObjectRequest(BUCKET_NAME, id)
        val s3Object = s3Client.getObject(getObjectRequest)
        return ByteArrayResource(s3Object.objectContent.readAllBytes())
    }

    fun upload(multipartFile: MultipartFile): String {
        val file = convertMultiPartToFile(multipartFile)
        val id = UUID.randomUUID().toString()
        putToS3(id, file)
        return id
    }

    private fun convertMultiPartToFile(file: MultipartFile): File {
        val convFile = File(file.originalFilename!!)
        val fos = FileOutputStream(convFile)
        fos.write(file.bytes)
        fos.close()
        return convFile
    }

    private fun putToS3(id: String, file: File) {
        val putObjectRequest = PutObjectRequest(BUCKET_NAME, id, file)
        s3Client.putObject(putObjectRequest)
    }

    fun delete(id: String) {
        val deleteObjectRequest = DeleteObjectRequest(BUCKET_NAME, id)
        s3Client.deleteObject(deleteObjectRequest)
    }
}