// explore.js

window.addEventListener("DOMContentLoaded", init);
let voices = [];
const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voice-select");
const textToSpeak = document.getElementById("text-to-speak");
const pressToTalkButton = document.querySelector("button");
const faceImage = document.querySelector("img");
const openMouthImage = "assets/images/smiling-open.png";
const smilingFaceImage = "assets/images/smiling.png";
function init() {
  //const voices = speechSynthesis.getVoices();

  populateVoiceList();
  pressToTalkButton.addEventListener("click", () => {
    const selectedVoiceName =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    const selectedVoice = voices.find(
      (voice) => voice.name === selectedVoiceName
    );
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);

    utterance.voice = selectedVoice;
    synth.speak(utterance);

    faceImage.src = openMouthImage;

    utterance.onend = () => {
      faceImage.src = smilingFaceImage;
    };
  });
}

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
