import re

with open("WhatsApp Chat with We❤️.txt", "r", encoding="utf-8") as filePath:
    userDictionary = {}
    device = input("Press Press A for Android and I for iPhone: ")
    if device == "a":
        for line in filePath:
            m = re.search('-(.+?):', line)
            if m:
                found = m.group(1)
                if found in userDictionary:
                    userDictionary[found] += 1
                else:
                    userDictionary[found] = 1
    elif device == "i":
        for line in filePath:
            m = re.search('] (.+?):', line)
            if m:
                found = m.group(1)
                if found in userDictionary:
                    userDictionary[found] += 1
                else:
                    userDictionary[found] = 1
    print(userDictionary)