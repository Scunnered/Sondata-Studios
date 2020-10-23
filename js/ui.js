//Code Modified From https://codepen.io/ContemporaryInsanity/pen/Mwvqpb
'use strict';
//var scopeCtx = document.getElementById('analyser').getContext('2d');
//var spectCtx = document.getElementById('analyser2').getContext('2d');

var wavesurfer;
var options;

$(document).ready(function() {
    options = {
        container: '#waveform',
        waveColor: 'aqua',
        progressColor: 'purple',
        loaderColor: 'yellow',
        cursorColor: 'navy',
        height: 200,
        plugins: [
            WaveSurfer.spectrogram.create({
                wavesurfer: wavesurfer,
                container: "#wave-spectrogram",
                labels: false,
                fftSamples: 2048
            })
        ]
    };
})




















































function draw() {
    drawSpectrum(analyser, spectCtx);
    drawScope(analyser, scopeCtx);

    setTimeout( () => {
        window.requestAnimationFrame(() => draw());
    }, 0)
}

function drawSpectrum(analyser, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    var scaling = height / 256;

    analyser.getByteFrequencyData(freqData);

    ctx.fillStyle = 'rgba(1, 1, 1, 255)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 200)';
    ctx.beginPath();

    for (var x = 0; x < width; x++)
        ctx.lineTo(x, height - freqData[x] * scaling);

    ctx.stroke();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
}

function drawScope(analyser, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var timeData = new Uint8Array(analyser.frequencyBinCount);
    var scaling = height / 256;
    var risingEdge = 0;
    var edgeThreshold = 5;

    analyser.getByteTimeDomainData(timeData);

    ctx.fillStyle = 'rgba(1, 1, 1, 255)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 200)';
    ctx.beginPath();

    // No buffer overrun protection
    while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    for (var x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
        ctx.lineTo(x - risingEdge, height - timeData[x] * scaling);

    ctx.stroke();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
}

