package com.jonghyeon.exchangemate.api

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "exchange.api")
class ExchangeApi {

    lateinit var key: String
    lateinit var url: String
}