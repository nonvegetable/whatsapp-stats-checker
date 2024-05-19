# whatsapp-stats-checker
It gives how many messages has each person has sent in a Whatsapp groupchat so you can identify who the spammer in your groupchat is.

## How does this work?
  1. Find out the number of users in the the groupchat
  2. Append the number of messages from each user
     2.1. We can use dictionaries to store the each user and the the number of messages from that user
     2.2. When the name of the user appears, we append the counter
     2.3. Update the dictionary
  3. Print the output
