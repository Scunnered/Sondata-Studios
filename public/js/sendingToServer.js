

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
            error: onError(),
            success: onSuccess()
        })
        .done(function(data){
            console.log("We did it");
        });
    });
});

function onError(data) {
    console.log("There has been an error")
    console.log(data)
}

function onSuccess(data) {
    console.log("Success")
    console.log(data)
}