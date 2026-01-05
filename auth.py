import json
import os


def load_students():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(base_dir, "data", "students.json")
    with open(path) as f:
        return json.load(f)


def authenticate(email, password):
    students = load_students()
    for user in students:
        if user.get("email") == email and user.get("password") == password:
            return {
                "id": user.get("id"),
                "name": user.get("name"),
                "role": user.get("role"),
            }
    return None
