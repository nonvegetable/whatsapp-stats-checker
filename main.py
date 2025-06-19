from flask import Flask, request, jsonify, render_template
import re

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process-chat', methods=['POST'])
def process_chat():
    file = request.files['file']
    device = request.form.get('device')

    # Group name is the file's first sender (read from the first 5 lines to detect it)
    initial_lines = [file.stream.readline().decode('utf-8') for _ in range(5)]
    file.stream.seek(0)  # Reset stream to the beginning for actual processing

    # Detect group name from the first few lines
    group_name = None
    for line in initial_lines:
        if device == 'a':
            match = re.search(r'- (.+?):', line)
        else:
            match = re.search(r'\] (.+?):', line)
        if match:
            group_name = match.group(1).strip()
            break

    user_dictionary = {}
    regex = r'-(.+?):' if device == 'a' else r'\] (.+?):'

    for line in file.stream:
        line = line.decode('utf-8')

        match = re.search(regex, line)
        if match:
            sender = match.group(1).strip()
            # Skip group/system messages
            if sender == group_name:
                continue
            if any(x in line.lower() for x in [
                'messages and calls are end-to-end encrypted',
                'image omitted',
                'this message was deleted',
                'added you',
                'removed',
                'created this group'
            ]):
                continue
            user_dictionary[sender] = user_dictionary.get(sender, 0) + 1

    return jsonify(user_dictionary)


if __name__ == '__main__':
    app.run(port=5000)
