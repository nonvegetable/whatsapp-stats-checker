import re

# open the export chat file and put the file path on the first argument
with open("your-file-path", "r", encoding="utf-8") as filePath:

    # a dictionary to store the usernames
    # amount of messages which will update dynamically
    userDictionary = {}

    # read the file line by line
    for line in filePath:
        # look for the character "]"
        # incrementally add the letters to the key of the dictionary
        # stop doing this when ":" is found
        # add letters to the key of the dictionary
        m = re.search('](.+?):', line)
        if m:
            found = m.group(1)
            # update the userDictionary
            if found in userDictionary:
                userDictionary[found] += 1
            else:
                userDictionary[found] = 1

# print the dictionary with values 
print(userDictionary)
