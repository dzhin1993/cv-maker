package com.cvmaker.api.model

import java.time.LocalDate

interface Background {
    val name: String
    val subName: String
    val startDate: LocalDate
    val endDate: LocalDate?
    val city: String?
    val description: String?
}