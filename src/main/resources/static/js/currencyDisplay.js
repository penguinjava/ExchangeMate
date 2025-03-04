$(document).ready(function (){
    console.log("여기까지 나옴");
    function updateCurrencyText(){
        let toCurrency = $("#toCurrency").val();
        $("#resultCurrency").text(toCurrency)
    }

    //결과 단위 변경
    $("#toCurrency").on("change", updateCurrencyText)

    updateCurrencyText();
});