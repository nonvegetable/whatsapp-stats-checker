# WhatsApp Stats Checker

This repository contains a Python script to analyze a WhatsApp chat export file. The script reads the file and counts the number of messages sent by each user, storing these counts in a dictionary. This can be useful for understanding chat dynamics, such as who the most active participants are.

## Features

- Reads a WhatsApp chat export file.
- Counts the number of messages sent by each user.
- Outputs the results as a dictionary.

## Prerequisites

Make sure you have Python installed on your system. This script is compatible with Python 3.6 and above.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nonvegetable/whatsapp-stats-checker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd WhatsApp-Chat-Analyzer
    ```

## Usage

1. Export your WhatsApp chat to a text file. Follow the instructions within WhatsApp to do this.

2. Place the exported chat file in the project directory.

3. Update the script to include the path to your exported chat file:
    ```python
    with open("your-file-path", "r", encoding="utf-8") as filePath:
    ```
    Replace `"your-file-path"` with the actual path to your exported chat file.

4. Run the script:
    ```bash
    python whatsapp_chat_analyzer.py
    ```
5. The script will output a dictionary where the keys are usernames and the values are the number of messages sent by each user.

## Example

Here's an example output:
```python
{
    "Alice": 120,
    "Bob": 95,
    "Charlie": 78
}
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to create a pull request or open an issue.

## Acknowledgements

- This project uses Python's `re` module for regular expression matching.
