package com.jonghyeon.exchangemate.controller

import com.jonghyeon.exchangemate.service.CurrencyExchangeService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ApiController (
    private val currencyExchangeService: CurrencyExchangeService
) {

    @GetMapping("/convert")
    fun convertCurrency(
        @RequestParam from: String,
        @RequestParam to: String,
        @RequestParam amount: Float
    ): Map<String, Any> {

        val result = currencyExchangeService.convert(from, to, amount)

        return if (result != null) {
            mapOf("success" to true, "result" to result)
        } else {
            mapOf("success" to false, "message" to "환율 정보를 가져올 수 없습니다.")
        }
    }

}