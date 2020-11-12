//unused test code

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