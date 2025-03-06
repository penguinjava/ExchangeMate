$(function(){

    function formatDate(date){
        let year = date.getFullYear();
        let month = String(date.getMonth() +1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate()-1);

    $.ajax({
        url: '/api/historical',
        type: 'GET',
        dataType: 'json',
    });

});