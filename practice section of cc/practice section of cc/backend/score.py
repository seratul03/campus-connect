from flask import Blueprint, request, jsonify
import json, os

bp = Blueprint("scores", __name__)
FILE_PATH = os.path.join("data", "score.json")


# ---------- LOAD FILE ----------
def load_scores():
    if not os.path.exists(FILE_PATH):
        return {}

    with open(FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except:
            return {}


# ---------- SAVE FILE ----------
def save_scores(data):
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


# ---------- API ROUTE ----------
@bp.route("/save-score", methods=["POST"])
def save_score():
    data = request.json
    module = data.get("module")
    score = data.get("score")

    scores = load_scores()

    # store BEST score only
    prev = scores.get(module, 0)
    scores[module] = max(prev, score)

    save_scores(scores)

    return jsonify({"status": "saved", "best": scores[module]})


# ---------- RUN STANDALONE ----------
if __name__ == "__main__":
    from flask import Flask
    from flask_cors import CORS

    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(bp)

    print("\n🔥 Score server running on http://localhost:5001\n")

    app.run(port=5001, debug=True)
