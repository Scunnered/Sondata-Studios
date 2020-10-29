var file = "../bird.mp3"

audio_file.onchange = function () {
    var files = this.files;
    file = URL.createObjectURL(files[0]);
    audio_player.src = file;
    //audio_player.play();
};

json_file.onchange = function () {
    json = new JSON
};