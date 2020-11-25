
function send() {
    var data1 = CVS.toDataURL();
    data1 = JSON.stringify(data1);
    console.log(data1)
    $.ajax({
        type: 'post',
        url: '/image',
        data: data1,
        dataType: 'application/json'
    })
    .done(function(){
        console.log("We did it");
    });
}