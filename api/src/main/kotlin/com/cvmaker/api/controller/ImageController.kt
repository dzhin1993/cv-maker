package com.cvmaker.api.controller

import com.cvmaker.api.service.ImageService
import org.springframework.core.io.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/images")
class ImageController(
    private val imageService: ImageService
) {

    @GetMapping(value = ["/{id}"], produces = [MediaType.IMAGE_JPEG_VALUE])
    @ResponseBody
    fun getFileViaByteArrayResource(
        @PathVariable("id") id: String
    ): Resource {
        return imageService.getImageResource(id)
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    fun delete(@PathVariable("id") id: String) {
        imageService.delete(id)
    }

    @PostMapping
    fun upload(@RequestParam("file") file: MultipartFile): String {
        return imageService.upload(file)
    }
}