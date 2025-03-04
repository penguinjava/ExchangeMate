package com.jonghyeon.exchangemate.api

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.client.WebClient

@Configuration
class WebClientConfig (private val exchangeKey: ExchangeKey){

    @Bean
    fun webClient(): WebClient {
        return WebClient.builder()
            .baseUrl(exchangeKey.url)
            .build()
    }
}