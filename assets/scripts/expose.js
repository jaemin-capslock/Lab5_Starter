// expose.js

window.addEventListener("DOMContentLoaded", init);
const hornSelect = document.getElementById("horn-select");
const image = document.querySelector("img");
const audio = document.querySelector("audio");
const volumeSlider = document.getElementById("volume");
const volumeIcon = document.querySelector("#volume-controls img");
const playButton = document.querySelector("button");

const volume_control = document.getElementById("volume_control");
function init() {
  // TODO
  const hornData = {
    "air-horn": {
      image: "assets/images/air-horn.svg",
      audio: "assets/audio/air-horn.mp3",
    },
    "car-horn": {
      image: "assets/images/car-horn.svg",
      audio: "assets/audio/car-horn.mp3",
    },
    "party-horn": {
      image: "assets/images/party-horn.svg",
      audio: "assets/audio/party-horn.mp3",
    },
  };

  hornSelect.addEventListener("change", (event) => {
    const selectedHorn = event.target.value;
    image.src = hornData[selectedHorn].image;
    image.alt = selectedHorn;
    audio.src = hornData[selectedHorn].audio;
  });

  const volumeIcons = [
    "assets/icons/volume-level-0.svg",
    "assets/icons/volume-level-1.svg",
    "assets/icons/volume-level-2.svg",
    "assets/icons/volume-level-3.svg",
  ];

  volumeSlider.addEventListener("input", (event) => {
    const volume = event.target.value;

    if (volume === "0") {
      volumeIcon.src = volumeIcons[0];
    } else if (volume < 33) {
      volumeIcon.src = volumeIcons[1];
    } else if (volume < 67) {
      volumeIcon.src = volumeIcons[2];
    } else {
      volumeIcon.src = volumeIcons[3];
    }

    audio.volume = volume / 100;
  });

  const confetti = new JSConfetti();

  playButton.addEventListener("click", () => {
    audio.play();

    if (hornSelect.value === "party-horn") {
      confetti.addConfetti();
    }
  });
}
