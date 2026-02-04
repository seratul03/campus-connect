document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("user-input");
  const messages = document.getElementById("chat-messages");

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        addMessage(
          data.reply || "I'm still learning. Please try again.",
          "bot"
        );
      })
      .catch(() => {
        addMessage(
          "Sorry, I ran into a problem reaching the assistant. Please try again in a moment.",
          "bot"
        );
      });
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  /* Optional welcome message */
  setTimeout(() => {
    addMessage(
      "👋 Hi! I’m your Campus Career Assistant. Ask me about jobs, internships, or ATS.",
      "bot"
    );
  }, 300);
});
