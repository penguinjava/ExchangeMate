package com.jonghyeon.exchangemate.service

import com.jonghyeon.exchangemate.api.ExchangeKey
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import java.time.LocalDate

@Service
class CurrencyExchangeService(
    private val webClient: WebClient,
    private val exchangeKey: ExchangeKey,
) {

    //환전 계산 api
    fun convert(from: String, to: String, amount: Float): Double? {

        val response = webClient.get()
            .uri{ builder-> builder
                .path("/convert")
                .queryParam("from", from)
                .queryParam("to", to)
                .queryParam("amount", amount)
                .queryParam("access_key", exchangeKey.apiKey)
                .build()
            }
            .retrieve()
            .bodyToMono(Map::class.java)
            .block()

        return response?.get("result")?.toString()?.toDoubleOrNull()
    }
}