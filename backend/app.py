# app.py
from flask import Flask, jsonify
import sqlite3
import random

app = Flask(__name__)

# API endpoint to get random question
@app.route('/', methods=['GET'])
def get_random_question():
    # Create a new SQLite connection and cursor for each request
    with sqlite3.connect('8ball.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT question FROM questions ORDER BY RANDOM() LIMIT 1')
        question = cursor.fetchone()[0]
    return jsonify({'question': question})

if __name__ == '__main__':
    app.run(debug=True)