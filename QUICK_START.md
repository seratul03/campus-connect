# ⚡ Quick Start Guide - 3 Minutes Setup

## 🎯 What You Need to Do

### 1️⃣ Install New Dependencies (30 seconds)
```bash
cd backend
pip install python-dotenv groq
```

### 2️⃣ Get FREE Groq API Key (2 minutes)
1. Go to: **https://console.groq.com/keys**
2. Sign up with Google/Email (free, no credit card)
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)

### 3️⃣ Add API Key (30 seconds)
Open `backend/.env` and replace:
```
GROQ_API_KEY=your_groq_api_key_here
```
With your actual key:
```
GROQ_API_KEY=gsk_abc123xyz...
```

### 4️⃣ Start Your Server
```bash
cd backend
python app.py
```

### 5️⃣ Test the Chatbot
Visit: `http://localhost:5000/chatbot.html`

---

## ✅ That's It!

Your chatbot now has:
- 🧠 AI-powered responses
- 🎤 Voice input
- 🔊 Voice output
- 💬 Conversation memory
- 🎨 Futuristic UI

---

## ⚠️ If You Skip the API Key

**No problem!** The chatbot still works with:
- FAQ-based responses from `chatbot_ans.json`
- All UI features
- Voice input/output

Just won't have AI conversation memory.

---

## 🎮 Try These Commands

- **"What internships are available?"**
- **"How can I improve my ATS score?"**
- **"Tell me about Campus Connect features"**
- **"/reset"** - Clear conversation history
- Use 🎤 button to speak your question!

---

## Need Help?

Check [CHATBOT_UPGRADE_README.md](CHATBOT_UPGRADE_README.md) for detailed docs.
