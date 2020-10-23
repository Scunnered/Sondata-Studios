
var oscillator;
var gainNode;
var filter;


function start() {
    wavesurfer = WaveSurfer.create(options);
    wavesurfer.load('https://wavesurfer-js.org/example/media/demo.wav');
    //wavesurfer.load(file);
    /*
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