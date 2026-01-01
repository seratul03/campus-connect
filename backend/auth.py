# backend/auth.py
import json
import os

def load_students():
    # This finds the folder where auth.py is living
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # This creates the full path to students.json
    path = os.path.join(base_dir, "data", "students.json")
    
    with open(path) as f:
        return json.load(f)

def authenticate(email, password):
    students = load_students()
    for user in students:
        if user["email"] == email and user["password"] == password:
            return {
                "id": user["id"],
                "name": user["name"],
                "role": user["role"]
            }
    return None
