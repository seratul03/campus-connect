from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Predefined Q&A
QA_PAIRS = {
    "hi": "Hello 👋 How can I help you today?",
    "hello": "Hi there! 😊",
    "what is campus connect": "Campus Connect is a smart career and research portal for students.",
    "how to apply for internships": "Go to the Internships section and apply using your profile.",
    "what is ats score": "ATS score shows how well your resume matches job requirements.",
    "bye": "Goodbye 👋 Best of luck!"
}

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "").lower()

    for question, answer in QA_PAIRS.items():
        if question in user_msg:
            return jsonify({"reply": answer})

    return jsonify({
        "reply": "Sorry 😅 I don't understand that yet. Please ask something else."
    })

if __name__ == "__main__":
    app.run(debug=True)
