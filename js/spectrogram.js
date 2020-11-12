// Code modified from https://codepen.io/jakealbaugh/pen/jvQweW/

var audioCtx;
var bufferSource;
var gainNode;
var brightness;
var filterCheck;

$(document).ready(function() {
    audioCtx = new AudioContext() || new webkitAudioContext();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1;
    filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1000;
    brightness = 2;
    filterCheck = false;
})

function start() {
    getAudio(file);
}

function getAudio(file) {
    request = new XMLHttpRequest();

    request.open("GET", file, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        audioCtx.decodeAudioData(request.response, onDecoded);
    }

    function onDecoded(buffer) {
        bufferSource = audioCtx.createBufferSource();
        
        if (filterCheck) {
            bufferSource.connect(filter);
            filter.connect(gainNode);
        }
        else {
            bufferSource.connect(gainNode);
        }
        bufferSource.buffer = buffer;
        gainNode.connect(audioCtx.destination)
        bufferSource.start();
    }

    request.send();

    const CVS = document.getElementById('spectrogram');
    const CTX = CVS.getContext('2d');
    const W = CVS.width = window.innerWidth/2;
    const H = CVS.height = window.innerHeight/2;

    const ANALYSER = audioCtx.createAnalyser();
  
    ANALYSER.fftSize = 8192; 
    
    navigator.mediaDevices.getUserMedia({ audio: true }).then(process);

    function process() {
        gainNode.connect(ANALYSER);
        const DATA = new Uint8Array(ANALYSER.frequencyBinCount);
        const LEN = DATA.length;
        const h = H / LEN;
        const x = W - 1;
        CTX.fillStyle = (0,0,0);
        CTX.fillRect(0, 0, W, H);
        
        var d = new Date();
        var n = d.getTime();
        var end = Math.ceil(bufferSource.buffer.duration*1000)+n;

        loop();

        function loop() {
            if (end > n) {
                window.requestAnimationFrame(loop);
            }
            d = new Date();
            n = d.getTime();
            let imgData = CTX.getImageData(1, 0, W - 1, H);
            CTX.fillRect(0, 0, W, H);
            CTX.putImageData(imgData, 0, 0);
            ANALYSER.getByteFrequencyData(DATA);
            for (let i = 0; i < LEN; i++) {
                //Set brightness with a multiplier (can be based on gain)
                let rat = DATA[i] / 255 * brightness;
                //Can set any colour with these two
                let hue = 250;
                let sat = '50%';
                //Can set brightness of the top of the spectrum(?)
                let lit = 10 + (70 * rat) + '%';
                CTX.beginPath();
                CTX.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
                CTX.moveTo(x, H - (i * h));
                CTX.lineTo(x, H - (i * h + h));
                CTX.stroke();
            }
        }
    }
}

function changeFilterType() {
    filter.type = document.getElementById("filterType").value;
}

function changeVolume() {
    gainNode.gain.value = document.getElementById("gain").value;
    document.getElementById("gainValue").innerHTML = Math.round((gainNode.gain.value + Number.EPSILON) * 100) / 100;
}

function changeFilterFreq() {
    filter.frequency.value = document.getElementById("filterFreq").value;
    document.getElementById("filterValue").innerHTML = filter.frequency.value;
}
function changeBrightness() {
    brightness = document.getElementById("brightness").value;
    document.getElementById("brightnessValue").innerHTML = brightness;
}

function filterToggle() {
    filterCheck = document.getElementById("filterCheck").checked;
    if (filterCheck) {
        document.getElementById("filterBox").innerHTML = "On";
    }
    else {
        document.getElementById("filterBox").innerHTML = "Off";
    }
}