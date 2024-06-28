from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS

# Define the function to get AI snippets for a query
def get_ai_snippets_for_query(query):
    headers = {"X-API-Key": "a504b5cb-9ed3-41c8-a466-aa8992c1e6d3<__>1PVqZSETU8N2v5f4AQnANCQx"}
    params = {"query": query}
    response = requests.get(
        "https://api.ydc-index.io/search",
        params=params,
        headers=headers,
    )
    return response.json()

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    bot_response = get_ai_snippets_for_query(user_message)
    return jsonify(bot_response)

if __name__ == '__main__':
    app.run(debug=True)