function getCanvas(){
    var CVS = document.getElementById("spectrogram");
    CVS.height = 10;
    CVS.width = 10;
    var CTX = cvs.getContext("2d");
    console.log(CVS)
    console.log(CTX)
    console.log(CVS.toDataURL())
}