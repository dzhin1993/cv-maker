package com.cvmaker.api.security.util

import org.springframework.security.core.context.SecurityContextHolder

fun getUserEmail(): String {
    val auth = SecurityContextHolder.getContext().authentication
    val principal = auth.principal
    return principal as String
}