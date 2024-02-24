# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import random

app = Flask(__name__)
CORS(app)

# SQLite database connection
conn = sqlite3.connect('8ball.db')
cursor = conn.cursor()

# API endpoint to get random question
@app.route('/api/question', methods=['GET'])
def get_random_question():
    cursor.execute('SELECT question FROM questions ORDER BY RANDOM() LIMIT 1')
    question = cursor.fetchone()[0]
    return jsonify({'question': question})

if __name__ == '__main__':
    app.run(debug=True)
