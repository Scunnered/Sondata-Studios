
var oscillator;
var gainNode;
var filter;
var ready = false;

function start() {
    wavesurfer = Object.create(WaveSurfer)

    wavesurfer = WaveSurfer.create(options);

    //Adding filters works so background noise could be eliminated once we know the filters we need
    var lowpass = wavesurfer.backend.ac.createBiquadFilter();
    wavesurfer.backend.setFilter(lowpass);
    
    //Actual load code to load the user/default uploaded file
    wavesurfer.load(file);
    //Example piece of audio to test spectrogram
    //wavesurfer.load('https://wavesurfer-js.org/example/media/demo.wav');
    
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