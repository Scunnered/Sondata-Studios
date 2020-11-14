

$(document).ready(function(){
    $("sendButton").on('submit', function(e){
        e.preventDefault();
        var data = $(JSON.parse(CVS.getDataURL())).val();
        $.ajax({
            type: 'post',
            url: '/image',
            data: data,
            dataType: 'application/json',
            contentType: 'application/json',
            headers: { 'api-key':'myKey' }
        })
        .done(function(data){
            console.log("We did it");
        });
    });
});