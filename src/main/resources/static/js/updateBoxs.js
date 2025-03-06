$(function(){

    const data =[
        "KRW","USD","JPY","EUR","CNY","GBP","AUD"
    ];

    const $source = $("#source");

    function updateBoxes(){
        const selected = $source.val();
        const others = data.filter(c => c!== selected);

        $("#box1").text(others[0]);
        $("#box2").text(others[1]);
        $("#box3").text(others[2]);
        $("#box4").text(others[3]);
        $("#box5").text(others[4]);
        $("#box6").text(others[5]);
    }

    $source.on('change',updateBoxes);
    updateBoxes();
});
