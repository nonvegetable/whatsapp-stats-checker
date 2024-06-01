import re

# open the export chat file and put the file path on the first argument
filePath = open("Your/File/Path", "r")

# a dictionary to store the usernames
# amount of messages which will update dynamically
userDictionary = {}

# create a while loop to check through the file
while False:
    # look for the character "]"
    # incrimentally add the letters to the key of the dictionary
    # stop doing this when ":" is found
    # add letters to the key of the dictionary
        m = re.search('](.+?):', text)
        if m:
            found = m.group(1)
