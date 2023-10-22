package com.cvmaker.api.handler

import com.cvmaker.api.exception.ErrorInfo
import com.cvmaker.api.exception.NotFoundException
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RestControllerAdvice


@RestControllerAdvice(annotations = [RestController::class])
class ExceptionInfoHandler {

     private val logger: Logger = LoggerFactory.getLogger(ExceptionInfoHandler::class.java)

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException::class)
    fun handleNotFound(req: HttpServletRequest, e: Exception): ErrorInfo {
        return getErrorInfo(req, e)
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(value = [
        IllegalArgumentException::class,
        MethodArgumentNotValidException::class
    ])
    fun handleUnprocessableEntity(req: HttpServletRequest, e: Exception): ErrorInfo {
        return getErrorInfo(req, e)
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleMessageNotReadable(req: HttpServletRequest, e: Exception): ErrorInfo {
        return getErrorInfo(req, e)
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception::class)
    fun handleError(req: HttpServletRequest, e: Exception): ErrorInfo {
        return getErrorInfo(req, e)
    }

    private fun getErrorInfo(req: HttpServletRequest, e: Exception): ErrorInfo {
        logger.error("request ${req.requestURI} error: ${e.message}")
        return ErrorInfo(req.requestURI, e.message)
    }
}