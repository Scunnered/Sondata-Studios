var readyToDownload = false;

function download() {
    if (readyToDownload) {
        var download = document.getElementById("download");
        var image = document.getElementById("spectrogram").toDataURL("image/png").replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    }
}

