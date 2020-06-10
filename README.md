
# tcc-test

Examples to test out author features of CMC Tai Chi Chuan Website

### 1 Check react works inside iframe

The react app has to have it's own server, and the author is a separate server that has to get the contents of the iframe from the react app server. This would be fine if the app had already been deployed, but if the app is being tested, need to start a separate server

The authorindex.html then needs to set the appropriate src for the iframe. This would be a little weird to automate.

One solution is to create the iframe using javascript and bring the src destination in as an env variable

This was tricky to debug, but embarrassingly simple when I realized that there were two servers ....

### 2 Check github can be accessed by server running on heroku
