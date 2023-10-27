//your JS code here. If required.
const buttons = document.querySelectorAll('.btn');
const stopButton = document.querySelector('.stop');

const sounds = {};

buttons.forEach(button => {
    const soundName = button.getAttribute('data-sound');
    sounds[soundName] = new Audio(`sounds/${soundName}.mp3`);
    button.addEventListener('click', () => playSound(soundName));
});

stopButton.addEventListener('click', stopAllSounds);

function playSound(soundName) {
    if (sounds[soundName]) {
        stopAllSounds();
        sounds[soundName].play();
    }
}

function stopAllSounds() {
    buttons.forEach(button => button.classList.remove('playing'));
    for (const sound in sounds) {
        if (!sounds[sound].paused) {
            sounds[sound].pause();
            sounds[sound].currentTime = 0;
        }
    }
}

// Add event listeners to stop audio when the audio ends
Object.values(sounds).forEach(sound => {
    sound.addEventListener('ended', () => stopAllSounds());
});
