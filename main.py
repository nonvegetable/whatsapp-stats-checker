from flask import Flask, request, jsonify
import re

app = Flask(__name__)

@app.route('/process-chat', methods=['POST'])
def process_chat():
    file = request.files['file']
    device = request.form.get('device')
    
    user_dictionary = {}
    regex = r'-(.+?):' if device == 'a' else r'\] (.+?):'

    for line in file.stream:
        line = line.decode('utf-8')
        match = re.search(regex, line)
        if match:
            found = match.group(1)
            user_dictionary[found] = user_dictionary.get(found, 0) + 1

    return jsonify(user_dictionary)

if __name__ == '__main__':
    app.run(port=5000)
