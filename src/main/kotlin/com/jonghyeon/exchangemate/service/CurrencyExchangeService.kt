package com.jonghyeon.exchangemate.service

import com.jonghyeon.exchangemate.api.ExchangeKey
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class CurrencyExchangeService(
    private val webClient: WebClient,
    private val exchangeKey: ExchangeKey,
) {

    // 환전 계산 api
    fun convert(from: String, to: String, amount: Float): Double? {
        val response = webClient.get()
            .uri { builder ->
                builder
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

    // 라이브 환전 api
    fun live(source: String): Map<String, Double> {
        val response = webClient.get()
            .uri { builder ->
                builder
                    .path("/live")
                    .queryParam("source", source)
                    .queryParam("access_key", exchangeKey.apiKey)
                    .build()
            }
            .retrieve()
            .bodyToMono(Map::class.java)
            .block()

        val result = (response?.get("quotes") as? Map<String, Double>) ?: emptyMap()
        return result
    }


    //날짜 지정 환정 api
    fun historical(date: String): Map<String, Double> {
        val response = webClient.get()
            .uri { builder ->
                builder
                    .path("/historical")
                    .queryParam("date", date)
                    .queryParam("source", "KRW")
                    .queryParam("access_key", exchangeKey.apiKey)
                    .build()
            }
            .retrieve()
            .bodyToMono(Map::class.java)
            .block()

        val result = (response?.get("quotes") as? Map<String, Double>) ?: emptyMap()
        return result
    }
}
