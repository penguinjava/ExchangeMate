// 실시간 환율
$(function() {
    let $source = $("#source");

    const currencyMap = {
        "KRW": "원",
        "USD": "달러",
        "JPY": "엔",
        "EUR": "유로",
        "CNY": "위안",
        "GBP": "파운드",
        "AUD": "호주달러"
    };

    $source.on("change", function(){
        let selectedSource = $(this).val();

        // AJAX 요청 전: spinner 아이콘을 보이도록 하고, spinner 영역 초기화
        for (let i = 1; i <= 6; i++) {
            let $spinner = $("#spinner" + i);
            $spinner.show();
            // spinner 아이콘 클래스를 추가하여 로딩 애니메이션을 표시
            $spinner.addClass("spinner-border text-primary");
            // 혹시 남아있는 텍스트가 있다면 지웁니다.
            $spinner.text("");
        }

        $.ajax({
            url: "/api/live",
            type: "GET",
            data: { source: selectedSource },
            dataType: "json",
            success: function(response){
                handleSuccessData(response, selectedSource);
            },
            error: handleError
        });
    });

    // 페이지 로딩 시 최초 트리거
    $source.trigger("change");

    function handleSuccessData(response, selectedSource) {
        let quotes = response.quotes;
        let targetList = ["KRW","USD","JPY","EUR","CNY","GBP","AUD"];
        let filtered = targetList.filter(code => code !== selectedSource);

        filtered.forEach((code, index) => {
            let key = selectedSource + code;
            let rate = quotes[key] * 1000;
            let $spinner = $("#spinner" + (index+1));

            if(rate !== undefined) {
                let displayRate = rate.toFixed(3);
                let displayCurrency = currencyMap[code] || code;
                let finalText = displayRate + " " + displayCurrency;

                // spinner 영역에 결과 텍스트를 넣고 spinner 아이콘 클래스 제거
                $spinner.removeClass("spinner-border text-primary").text(finalText);
            } else {
                $spinner.removeClass("spinner-border text-primary").text("환율 정보를 찾을 수 없습니다.");
            }
        });
    }

    function handleError(error){
        alert("환전 정보 가져오기 실패");
        for (let i = 1; i <= 6; i++){
            $("#spinner" + i).removeClass("spinner-border text-primary").text("");
        }
    }
});
