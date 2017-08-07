import * as express from "express"
import * as compression from "compression"
import * as bodyParser from "body-parser"
import mocks from "./mocks"
import * as path from "path"
import * as Twitter from "twitter"
import * as http from "http"
import { Tweet } from "../src/app/models/tweet"
import * as SocketIO from "socket.io"
import { Configuration } from "../src/app/models/configuration"

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

let updatedConfig: Configuration = new Configuration("Javascript")

app.use(compression())
app.use(bodyParser.json())
app.use(`/`, express.static(__dirname + "/../dist"))
app.get(`/api/tweets`, (req, res) => res.json())
app.get(`/api/configuration`, (req, res) => res.json(updatedConfig))

app.put(`/api/configuration`, (req, res) => {
  updatedConfig = req.body

  res.sendStatus(200)
})
app.get(`/*`, (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"))
})

const MOCKED_TWEET = {
  text:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

let twitterStream

function openTwitterStream(socket) {
  return client.stream(
    "statuses/filter",
    { track: updatedConfig.hashtag },
    function(stream) {
      stream.on("data", function(tweet) {
        const formatedTweet = {
          avatar: tweet.user.profile_image_url_https,
          text: tweet.text,
          name: tweet.user.name,
          usernamer: tweet.user.screen_name,
          creationDate: tweet.created_at,
          retweetCount: tweet.retweet_count,
          likeCount: tweet.favorite_count
        }
        socket.emit("tweets", {
          tweet: new Tweet(
            tweet.user.profile_image_url_https,
            tweet.text,
            tweet.user.name,
            tweet.user.screen_name,
            tweet.created_at,
            tweet.retweet_count,
            tweet.favorite_count
          )
        })
      })

      stream.on("error", function(error) {
        console.log(error)
      })
    }
  )
}

const twitterPipes = []
io.on("connection", socket => {
  twitterPipes.push({ socket, stream: openTwitterStream(socket) })
  // si socket closed ou twtterSteeam closed => retirer de la list le pipe
})

server.listen(3000, () => {
  console.log("It's running.")
})
