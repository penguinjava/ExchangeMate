package com.jonghyeon.exchangemate.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {

    @GetMapping("/")
    fun main(): String{
        return "page/index"
    }

    @GetMapping("/exchange-info")
    fun exchange(model: Model): String {
        model.addAttribute("message", "환전 상세보기")
        return "page/exchange-info"
    }

}