$(function() {

    function formatDate(date){
        let year = date.getFullYear();
        let month = String(date.getMonth() +1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    // 어제 기준 환율
    let $yesterdayTo = $("#yesterdayTo");

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);

    $.ajax({
        url: '/api/historical',
        type: 'GET',
        data: { date: yesterdayStr },
        dataType: 'json',
        success: handleYesterdaySuccess,
        error: handleYesterdayError
    });

    // 성공 시
    function handleYesterdaySuccess(response) {

        $yesterdayTo.on("change", function() {
            let targetCurrency = $(this).val();
            let key = "KRW" + targetCurrency;
            let rate = response.quotes[key] * 1000;

            let text = $yesterdayTo.find("option:selected").text();
            let splitted = text.split(" ");
            let currencyPart = splitted[2];

            currencyPart = currencyPart.replace("(", "").replace(")", "");

            // 환율 유효성 검증
            if(rate !== undefined) {
                // 소수점 3자리 고정
                rate = rate.toFixed(3);

                // 숫자 + 통화 단위를 합쳐서 표시
                $("#yesterday-rate").text(rate + " " + currencyPart);
            } else {
                $("#yesterday-rate").text("환율 정보를 찾을 수 없습니다.");
            }

            $("#yesterday-result").text(currencyPart);
        });

        // 페이지 로딩 시 한 번 실행
        $yesterdayTo.trigger("change");
    }


    // 에러
    function handleYesterdayError() {
        alert("어제 환전 정보 가져오기 실패");
    }

    // -----------------------------
    // 오늘 기준 환율
    // -----------------------------
    let $todayTo = $("#todayTo");
    const todayStr = formatDate(today);

    $.ajax({
        url: '/api/historical',
        type: 'GET',
        data: { date: todayStr },
        dataType: 'json',
        success: handleTodaySuccess,
        error: handleTodayError
    });

    // 성공 시
    function handleTodaySuccess(response) {
        $todayTo.on("change", function() {
            let targetCurrency = $(this).val();
            let key = "KRW" + targetCurrency;
            let rate = response.quotes[key] * 1000;

            let text = $todayTo.find("option:selected").text();
            let splitted = text.split(" ");
            let currencyPart = splitted[2];

            currencyPart = currencyPart.replace("(", "").replace(")", "");

            // 유효성 검증
            if(rate !== undefined) {
                // 소수점 3자리 고정
                rate = rate.toFixed(3);

                // “숫자 + 통화 명칭”으로 합쳐서 표시
                $("#today-rate").text(rate + " " + currencyPart);
            } else {
                $("#today-rate").text("환율 정보를 찾을 수 없습니다.");
            }

            $("#today-result").text(currencyPart);
        });

        // 페이지 로딩 시 한 번 실행
        $todayTo.trigger("change");
    }


    // 에러
    function handleTodayError() {
        alert("오늘 환전 정보 가져오기 실패");
    }
});
