
var oscillator;
var gainNode;
var filter;
var ready = false;
var highpass;
var colourMap;

$(document).ready(function() {
    wavesurfer = Object.create(WaveSurfer)
    WaveSurfer.util
        .fetchFile({ url: '/colourmaps/hot.json', responseType: 'json' })
        .on('success', colorMap => {
            colourMap = colorMap;
    });
})


function start() {
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
                fftSamples: 1024,
                colorMap: colourMap
            })
        ]
    };

    wavesurfer = WaveSurfer.create(options);

    //Adding filters works so background noise could be eliminated once we know the filters we need
    //var lowpass = wavesurfer.backend.ac.createBiquadFilter();
    //wavesurfer.backend.setFilter(lowpass);
    
    highpass = wavesurfer.backend.ac.createBiquadFilter();

    highpass.type = "lowpass";

    highpass.frequency.value = 500;

    //audioCtx = wavesurfer.getAudioContext();

    //gainNode = audioCtx.createGain();

    //gainNode.gain.value = 0.1;

    //gainNode.connect(audioCtx);
    
    //wavesurfer.backend.setFilter(highpass);
    
    //Actual load code to load the user/default uploaded file
    wavesurfer.load(file);
    
    wavesurfer.on('ready', function () {
        ready = true;
    });
}

function play() {
    if (ready) {
        wavesurfer.play();
    }
}

function stop() {
    wavesurfer.pause();
}

function oldStart() {
    /*
    helo
    var audioCtx = new window.AudioContext();

    analyser = audioCtx.createAnalyser();

    oscillator = audioCtx.createOscillator();

    oscillator.frequency.value = 440;
    oscillator.type = 'sine';

    gainNode = audioCtx.createGain();

    gainNode.gain.value = 1;

    filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 300;

    oscillator.connect(gainNode);

    oscillator.connect(filter);
    filter.connect(gainNode);

    gainNode.connect(audioCtx.destination);
    //oscillator.start();
    gainNode.connect(analyser);
    draw();
    */
}


function changeFreq() {
    oscillator.frequency.value = document.getElementById("oscillatorFreq").value;
    document.getElementById("oscillatorFreqValue").innerHTML = oscillator.frequency.value;
}

function changeType() {
    oscillator.type = document.getElementById("oscillatorType").value;
}

function changeVolume() {
    gainNode.gain.value = document.getElementById("gain").value;
    document.getElementById("gainValue").innerHTML = gainNode.gain.value;
}

function changeFilterType() {
    filter.type = document.getElementById("filterType").value;
}

function changeFilterFreq() {
    filter.frequency.value = document.getElementById("filterFreq").value;
    document.getElementById("filterValue").innerHTML = filter.frequency.value;
}