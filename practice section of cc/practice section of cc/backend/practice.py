from flask import Blueprint, request, jsonify
import os
import json

bp = Blueprint("practice", __name__)

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

PRACTICE_PATH = os.path.join(DATA_DIR, "practice.json")
PROFILE_PATH = os.path.join(DATA_DIR, "profile.json")


def _safe_load_json(path, default=None):
    if default is None:
        default = {}
    try:
        if not os.path.exists(path):
            return default
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def _safe_write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ---------------- PROFILE ----------------
@bp.route("/api/profile", methods=["GET"])
def get_profile():
    data = _safe_load_json(PROFILE_PATH, default={})
    return jsonify(data)


@bp.route("/api/profile", methods=["PUT"])
def update_profile():
    payload = request.get_json(force=True, silent=True) or {}
    _safe_write_json(PROFILE_PATH, payload)
    return jsonify({"message": "Profile updated!"})


# ---------------- PRACTICE ----------------
@bp.route("/api/practice", methods=["GET"])
def get_practice():
    try:
        data = _safe_load_json(PRACTICE_PATH, default={"categories": []})
        return jsonify(data)
    except Exception:
        return jsonify({"error": "Failed to load practice data"}), 500


@bp.route("/api/practice/progress", methods=["PUT"]) 
def update_practice_progress():
    payload = request.get_json(force=True, silent=True) or {}
    title = payload.get("title")
    progress = payload.get("progress")

    if title is None or progress is None:
        return jsonify({"error": "'title' and 'progress' are required"}), 400

    data = _safe_load_json(PRACTICE_PATH, default={"categories": []})

    for cat in data.get("categories", []):
        for m in cat.get("modules", []):
            if m.get("title") == title:
                m["progress"] = progress

    _safe_write_json(PRACTICE_PATH, data)
    return jsonify({"message": "Progress saved"})
