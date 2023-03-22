document.addEventListener('DOMContentLoaded', function() { startPlayer(), false });

const videoPlayer = document.querySelector('.player');

const videoFrame = document.createElement('video');
videoFrame.classList.add('video');


const source = document.createElement('source');

source.setAttribute('src', './video.mp4');
source.setAttribute('type', 'video/mp4');

const barreContainer = document.createElement('div');
barreContainer.classList.add('barre');

videoPlayer.appendChild(barreContainer);

const barre = document.createElement('input');
barre.setAttribute('type', 'range');
barre.setAttribute('name', 'barreProgresion');
barre.setAttribute('value', '0');
barre.setAttribute('min', '0');
barre.setAttribute('max', '100');
barre.id = 'barreProgresion';

videoFrame.appendChild(source);
videoPlayer.appendChild(videoFrame);
videoPlayer.appendChild(barreContainer);

barreContainer.appendChild(barre);

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttonsContainer');
videoPlayer.appendChild(buttonsContainer);

const buttons = document.createElement('div');
buttons.classList.add('bouton');

buttonsContainer.appendChild(buttons);

const left =  document.createElement('div');
left.classList.add('left');
buttons.appendChild(left);

const playButton = document.createElement('i');
playButton.classList.add('fa', 'fa-play', 'fa-xl');
left.appendChild(playButton);

const pauseButton = document.createElement('i');
pauseButton.classList.add('fa', 'fa-pause', 'fa-xl');
left.appendChild(pauseButton);

const stopButton = document.createElement('i');
stopButton.classList.add('fa', 'fa-stop', 'fa-xl');
left.appendChild(stopButton);

const right =  document.createElement('div');
right.classList.add('right');
buttons.appendChild(right);

const volumeDownButton = document.createElement('i');
volumeDownButton.classList.add('fa', 'fa-down-up', 'fa-xl');
right.appendChild(volumeDownButton);

const volumeBarre = document.createElement('input');
volumeBarre.classList.add('volumeBarre');
volumeBarre.setAttribute('type', 'range');
volumeBarre.setAttribute('min', '0');
volumeBarre.setAttribute('max', '100');
right.appendChild(volumeBarre);

const volumeUpButton = document.createElement('i');
volumeUpButton.classList.add('fa', 'fa-volume-up', 'fa-xl');
right.appendChild(volumeUpButton);

function startPlayer(){
    videoFrame.controls = false;
}

playButton.onclick = function() {
    videoFrame.play();
    let a = setInterval(() => {
        updateVideoPos();
    }, 1000);
    playButton.style.display="none";
    pauseButton.style.display="block";
};

pauseButton.onclick = function() {
    videoFrame.pause();
    playButton.style.display="block";
    pauseButton.style.display="none";
};

stopButton.onclick = function() {
    videoFrame.pause();
    videoFrame.currentTime = 0;
    playButton.style.display="block";
    pauseButton.style.display="none";
};

volumeBarre.onchange = function(){
    videoFrame.volume = document.querySelector('.volumeBarre').value / 100;
}

barre.onchange = function(){
    let nav = videoFrame.duration * (barre.value / 100);
    videoFrame.currentTime = nav;
}

function updateVideoPos(){
    let pos = 0;

    if(!isNaN(videoFrame.duration)){
        pos = videoFrame.currentTime * (100 / videoFrame.duration);
        barre.value = pos;
        updateRemainingTime();
    }
}

function updateRemainingTime() {
    const duration = videoFrame.duration;
    const currentTime = videoFrame.currentTime;

    if (!isNaN(duration) && !isNaN(currentTime)) {
        const remainingTime = duration - currentTime;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60);

        const remainingTimeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const remainingTimeElement = document.querySelector('.remaining-time');
        remainingTimeElement.textContent = remainingTimeDisplay;
    }
}

buttons.appendChild(document.createElement('div')).classList.add('remaining-time');





