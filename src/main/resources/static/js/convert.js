$(function(){
    $("#calculateButton").click(function (){
        let fromCurrency = $("#fromCurrency").val();
        let toCurrency = $("#toCurrency").val();
        let amountInput = parseFloat($("#amountInput").val().replace(/,/g,""));

        //검증
        if(isNaN(amountInput) || amountInput<=0){
            alert("금액을 입력해주세요");
            return;
        }

        //api통신 (api노출위험으로 백엔드요청)
        $.ajax({
            url: "api/convert",
            type: "GET",
            data: {from: fromCurrency,
                to: toCurrency,
                amount: amountInput},
            success: handleSuccess,
            error: handleError
        });
    });

    //성공시
    function handleSuccess(response){
        let convertedAmount = parseFloat(response.result).toFixed(2);
        $("#resultAmount").text(convertedAmount);
    }

    //에러
    function handleError(error){
        alert("환전 정보 가져오기 실패");
    }
});