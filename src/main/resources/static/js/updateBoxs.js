// 선택에 따른 div 글씨 변경
$(function() {
    const data = [
        "KRW","USD","JPY","EUR","CNY","GBP","AUD"
    ];
    const $source = $("#source");

    function updateBoxes() {
        const selected = $source.val();
        const others = data.filter(c => c !== selected);

        // 예) #box1 ~ #box6 각각 "USD", "EUR", "CNY"... 표시
        $("#box1").text(others[0]);
        $("#box2").text(others[1]);
        $("#box3").text(others[2]);
        $("#box4").text(others[3]);
        $("#box5").text(others[4]);
        $("#box6").text(others[5]);
    }

    $source.on('change', updateBoxes);
    updateBoxes(); // 페이지 로딩 시 한 번 실행
});
