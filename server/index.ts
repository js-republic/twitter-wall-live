import * as express from "express"
import * as compression from "compression"
import mocks from "./mocks"
import * as path from "path"
import * as Twitter from "twitter"
import * as http from "http"
import * as SocketIO from "socket.io"

const Twitter = require("twitter")

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
})

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

app.use(compression())
app.use(`/`, express.static(__dirname + "/../dist"))
app.get(`/api/tweets`, (req, res) => res.json())
app.get(`/*`, (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"))
})

io.on("connection", function(socket) {
  client.stream("statuses/filter", { track: "javascript" }, function(stream) {
    stream.on("data", function(tweet) {
      const formatedTweet = {
        text: tweet.text
      }
      socket.emit("tweets", {
        tweet: formatedTweet
      })
    })

    stream.on("error", function(error) {
      console.log(error)
    })
  })
})

server.listen(3000, () => {
  console.log("It's running.")
})
