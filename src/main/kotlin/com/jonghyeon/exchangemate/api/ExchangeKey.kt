package com.jonghyeon.exchangemate.api

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class ExchangeKey {

    @Value("\${exchange.api.key}")
    lateinit var apiKey: String

    @Value("\${exchange.api.url}")
    lateinit var url: String
}