package com.cvmaker.api.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class TokenValidationFilter(
    private val tokenVerifier: GoogleIdTokenVerifier
) : OncePerRequestFilter() {

    private val authorization = "Authorization"
    private val tokenPrefix = "Bearer "
    private val email = "email"
    private val roleUser = "ROLE_USER"

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            verifyToken(request)?.let { auth ->
                SecurityContextHolder.getContext().authentication = auth
            }
        } catch (ex: Exception) {
            logger.error("Cannot set user authentication: {}", ex)
        }
        doFilter(request, response, filterChain)
    }

    private fun verifyToken(request: HttpServletRequest): Authentication? {
        parseToken(request)?.let { token ->
            tokenVerifier.verify(token)?.let { googleIdToken ->
                val email = googleIdToken.payload[email] as String
                return UsernamePasswordAuthenticationToken(
                    email, token, AuthorityUtils.commaSeparatedStringToAuthorityList(roleUser)
                )
            }
        }
        return null
    }

    private fun parseToken(request: HttpServletRequest): String? {
        val headerAuth = request.getHeader(authorization)
        return if (!headerAuth.isNullOrBlank() && headerAuth.startsWith(tokenPrefix)) {
            headerAuth.substring(7)
        } else null
    }
}