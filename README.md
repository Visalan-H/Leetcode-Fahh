# leetcode-fah

plays FAHH every time you fail a leetcode test case. works on both **run** and **submit**.

<br />

<p align="center">
  <a href="https://github.com/Visalan-H/Leetcode-Fahh/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇ DOWNLOAD ZIP-000000?style=for-the-badge&logoColor=white" alt="Download" />
  </a>
</p>

<br />

---


## install

**1. get the extension**

```bash
git clone https://github.com/Visalan-H/Leetcode-Fahh.git
```

or hit the download button above and extract the zip.

**2. sound file**

A `fah.mp3` sound is included in this repository, so you don't need to provide one. Use the bundled sound as-is, or replace `fah.mp3` with any other mp3 (buzzer, sad trombone, Family Feud X, etc.) but keep the filename `fah.mp3`.

**3. load it in chrome**

- go to `chrome://extensions`
- toggle **developer mode** on (top right)
- click **load unpacked** → select the `leetcode-fah/` folder

**4. break something**

open any leetcode problem, submit wrong code, listen.

---

## how it works

leetcode polls a `/check/` endpoint after both run and submit until the result is ready. the extension intercepts every fetch request, watches for `/check/` responses, and fires when a failure comes back.

run and submit use different fields for failure:

| action | fail condition |
|--------|---------------|
| submit | `status_code !== 10` |
| run    | `correct_answer === false` |

two content scripts are needed because chrome isolates extension scripts from the page context. `interceptor.js` runs in the real page context (`world: MAIN`) to patch `window.fetch`, then signals back via a custom DOM event. `content.js` lives in the sandboxed context where it can access `chrome.runtime` to load the audio file.

---

## files

```
leetcode-fah/
├── manifest.json     — extension config
├── interceptor.js    — patches window.fetch to spy on responses
├── content.js        — plays the sound when signalled
└── fah.mp3           — bundled sound file (replace if desired)
```

---

## changing the sound

swap `fah.mp3` for any mp3, then hit the reload button on the extension at `chrome://extensions`.
