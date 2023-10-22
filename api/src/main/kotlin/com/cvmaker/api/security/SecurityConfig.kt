package com.cvmaker.api.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableMethodSecurity
class SecurityConfig {

    @Value("\${google.client.id}")
    private lateinit var googleClientId: String

    @Value("\${client.url}")
    private lateinit var clientUrl: String


    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        return http.csrf { configurer -> configurer.disable() }
            .cors { cors -> cors.configurationSource(corsConfigurationSource()) }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests { auth -> auth.anyRequest().authenticated() }
            .addFilterBefore(
                TokenValidationFilter(buildGoogleTokenVerifier()),
                BasicAuthenticationFilter::class.java
            )
            .exceptionHandling { configurer ->
                configurer
                    .authenticationEntryPoint(BasicAuthenticationEntryPoint())
            }
            .build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf(clientUrl)
        configuration.addAllowedHeader("*")
        configuration.addAllowedMethod("*")
        val urlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration)
        return urlBasedCorsConfigurationSource
    }

    private fun buildGoogleTokenVerifier(): GoogleIdTokenVerifier {
        return GoogleIdTokenVerifier.Builder(NetHttpTransport(), GsonFactory())
            .setAudience(listOf(googleClientId))
            .build()
    }
}