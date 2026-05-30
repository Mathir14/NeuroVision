# NeuroVision 🧠

A web-based cognitive assessment platform that measures and tracks neurological and cognitive performance through 9 clinically-inspired tests.

🔗 **Live Site:** [neurovisionz.netlify.app](https://neurovisionz.netlify.app)

---

## What It Does

NeuroVision lets users run standardized cognitive and motor tests directly in the browser — no downloads, no sign-up. Results are saved locally and tracked over time, with an AI assistant that analyzes performance and provides personalized feedback.

---

## Tests

| Test | Measures |
|------|----------|
| ⚡ Reaction Time | Visual reflex speed |
| 🔢 Number Memory | Short-term digit memory |
| 🎯 Sequence Memory | Visual-spatial pattern recall |
| ⌨️ Finger Tapping | Motor speed (Parkinson's indicator) |
| 💬 Verbal Memory | Word recognition and recall |
| ✏️ Drawing Accuracy | Fine motor control |
| 🎤 Speech Recognition | Articulation and clarity |
| ✋ Hand Stability | Tremor detection via webcam |
| 🚶 TUG Test | Mobility and fall risk assessment |

---

## Features

- **Progress tracking** — scores saved across sessions with trend analysis
- **Dashboard** — view best scores, averages, and progress charts for every test
- **AI Assistant** — powered by Groq (Llama 3.3 70B), analyzes your results and gives personalized tips
- **Camera-based tests** — Hand Stability and TUG Test use webcam + ML models (TensorFlow.js / MediaPipe)
- **No account needed** — everything runs in the browser, data stays on your device

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **AI:** Groq API (Llama 3.3 70B Versatile)
- **ML:** TensorFlow.js (Handpose), MediaPipe Pose
- **Backend:** Netlify Serverless Functions (API key proxy)
- **Hosting:** Netlify
- **Storage:** localStorage

---

## How It Works

1. Open the site and pick any test from the assessments page
2. Complete the test — results are saved automatically
3. Visit the Dashboard to see your stats and progress charts
4. Chat with the AI assistant to get insights on your performance

The AI chatbot has full context of your test history and can identify trends, flag areas of concern, and suggest improvements.

---

## Privacy

All test data is stored locally in your browser — nothing is sent to any server. Only the text you send to the AI assistant is processed externally (via Groq's API).
