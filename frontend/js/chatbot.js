const chatBody = document.getElementById("chatBody");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const speakerBtn = document.getElementById("speakerBtn");

// STATES
let isVoiceMode = false;  // Did user use Mic?
let isSpeakerOn = true;   // Is global sound On?

// SVG ICONS
const iconVolOn = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
const iconVolOff = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

// STORE VOICES
let voices = [];
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
}
populateVoices();
if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = populateVoices;
}

/* ===============================
   EVENT LISTENERS
================================ */
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

input.addEventListener("input", () => {
  isVoiceMode = false; 
});

speakerBtn.addEventListener("click", () => {
  isSpeakerOn = !isSpeakerOn;
  if (isSpeakerOn) {
    speakerBtn.innerHTML = iconVolOn;
    speakerBtn.classList.remove("muted");
  } else {
    speakerBtn.innerHTML = iconVolOff;
    speakerBtn.classList.add("muted");
    window.speechSynthesis.cancel();
  }
});

/* ===============================
   ADD MESSAGE
================================ */
function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.className = type === "user" ? "user-msg" : "bot-msg";

  if (type === "bot" && text.includes("•")) {
    const lines = text.split("•").filter((line) => line.trim() !== "");
    if (lines.length > 0 && !text.startsWith("•")) {
      const intro = document.createElement("div");
      intro.textContent = text.split("•")[0];
      msgDiv.appendChild(intro);
    }
    lines.forEach((line) => {
      const bullet = document.createElement("div");
      bullet.className = "bullet-line";
      bullet.textContent = line.trim();
      msgDiv.appendChild(bullet);
    });
  } else {
    msgDiv.textContent = text;
  }
  chatBody.appendChild(msgDiv);
  scrollToBottom();
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ===============================
   TYPING INDICATOR
================================ */
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.id = "typingIndicator";
  typing.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatBody.appendChild(typing);
  scrollToBottom();
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

/* ===============================
   TEXT TO SPEECH (PRONUNCIATION FIX)
================================ */
function speak(text) {
  if (!isSpeakerOn) return;

  window.speechSynthesis.cancel();

  // 1. CLEANUP SPECIAL CHARS
  let cleanText = text.replace(/•/g, "").replace(/\*/g, "");

  // 2. FIX PRONUNCIATIONS
  // Replaces "B.Tech" with "B Tech" so it doesn't say "dot"
  cleanText = cleanText.replace(/B\.Tech/gi, "B Tech"); 
  cleanText = cleanText.replace(/C\.S\.E/gi, "C S E");

  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  const preferredVoice = voices.find(voice => 
    voice.name.includes("Google US English") || 
    voice.name.includes("Microsoft Zira") || 
    voice.name.includes("Samantha")
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
    utterance.lang = preferredVoice.lang;
  }
  
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}

/* ===============================
   SEND MESSAGE
================================ */
function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";
  
  const wasVoiceUsed = isVoiceMode; 
  isVoiceMode = false; 

  showTyping();

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then((res) => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then((data) => {
      removeTyping();
      const botReply = data.reply || "No response received.";
      addMessage(botReply, "bot");
      
      if (wasVoiceUsed && isSpeakerOn) {
        speak(botReply);
      }
    })
    .catch(() => {
      removeTyping();
      addMessage("⚠️ Connection error.", "bot");
    });
}

/* ===============================
   SPEECH TO TEXT
================================ */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  micBtn.addEventListener("click", () => {
    micBtn.style.color = "#ff4b4b"; 
    recognition.start();
  });

  recognition.onend = () => {
    micBtn.style.color = ""; 
  };

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    isVoiceMode = true; 
    input.value = voiceText;
    input.focus();
  };
} else {
  if(micBtn) micBtn.style.display = "none";
}
