const fah = new Audio(chrome.runtime.getURL("fah.mp3"));

window.addEventListener("leetcode-fah", () => {
    fah.currentTime = 0;
    fah.play();
});