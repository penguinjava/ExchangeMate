$(document).ready(function (){
    let $toCurrency = $("#toCurrency");
    let $fromCurrency = $("#fromCurrency");

    //to
    function updateToCurrency(){
        let text = $toCurrency.find("option:selected").text();
        let toCurrency = text.split(" ")[2];
        $("#resultCurrency").text(toCurrency)
    }
    //from
    function updateFromCurrency(){
        let text = $fromCurrency.find("option:selected").text();
        let fromCurrency = text.split(" ")[2];
        $("#selectCurrency").text(fromCurrency)
    }

    //결과 단위 변경
    $toCurrency.on("change", updateToCurrency);
    $fromCurrency.on("change", updateFromCurrency);

    updateToCurrency();
    updateFromCurrency();
});