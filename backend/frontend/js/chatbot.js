document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("user-input");
  const messages = document.getElementById("chat-messages");

  /* Predefined Q&A */
  const answers = {
    hello: "Hi! 👋 How can I help you today?",
    internship: "You can explore internships from the Internships section.",
    jobs: "Jobs are listed under the Jobs page.",
    ats: "Your ATS score helps you understand resume compatibility.",
    bye: "Goodbye! Feel free to come back anytime 😊",
  };

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const reply =
      answers[text.toLowerCase()] ||
      "I'm still learning. Try asking about jobs, internships, or ATS.";

    setTimeout(() => {
      addMessage(reply, "bot");
    }, 400);
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
