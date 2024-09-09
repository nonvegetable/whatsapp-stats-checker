import re


with open("your-file-path", "r", encoding="utf-8") as filePath:
    userDictionary = {}
    for line in filePath:
        m = re.search('](.+?):', line)
        if m:
            found = m.group(1)
            if found in userDictionary:
                userDictionary[found] += 1
            else:
                userDictionary[found] = 1
print(userDictionary)