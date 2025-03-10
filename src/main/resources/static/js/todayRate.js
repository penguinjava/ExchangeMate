//오늘 날짜 기준 환율 표시 api

$(function(){

    let $todayTo = $("#todayTo");

    function formatDate(date){
        let year = date.getFullYear();
        let month = String(date.getMonth() +1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    const today = new Date();
    const todayStr = formatDate(today)

    $.ajax({
        url: '/api/historical',
        type: 'GET',
        data:{date:todayStr},
        dataType: 'json',
        success: handleSuccess,
        error: handleError
    });

    //to
    function updateToCurrency(){
        let text = $todayTo.find("option:selected").text();
        let todayTo = text.split(" ")[2];
        $("#today-result").text(todayTo)
    }


    //성공시
    function handleSuccess(response){
        $todayTo.on("change", function(){
            let targetCurrency = $(this).val();
            let key = "KRW"+ targetCurrency;
            //값 지정해서 가져옴
            let rate = response.quotes[key] * 1000;

            //유효성검증
            if(rate !== undefined){
                $("#today-rate").text(rate);
            }else {
                $("#today-rate").text("환율 정보를 찾을 수 없습니다.");
            }

        });

        $todayTo.trigger("change");

    }

    //에러
    function handleError(){
        alert("환전 정보 가져오기 실패");
    }

});