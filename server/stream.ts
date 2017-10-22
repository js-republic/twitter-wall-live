import * as SocketIO from 'socket.io';
import { Server } from 'http';
import mock from './mocks';
//import env from './env';
//import Twitter from 'twitter';
/*const client = new Twitter({
  consumer_key: env.TWITTER_CONSUMER_KEY,
  consumer_secret: env.TWITTER_CONSUMER_SECRET,
  access_token_key: env.TWITTER_TOKEN_KEY,
  access_token_secret: env.TWITTER_TOKEN_SECRET
});*/

const twitterPipes = [];
const io: SocketIO = new SocketIO({ path: '/tweet' });

function openTwitterStream(socket) {
  console.log('New connection !');
  return setInterval(() => {
    socket.emit('tweet', {
      tweet: mock()
    })
  }, 1000);
}

export function create(server: Server): SocketIO {
  io.attach(server);
  io.on('connection', socket => twitterPipes.push({ socket, stream: openTwitterStream(socket) }));
  // si socket closed ou twtterSteeam closed => retirer de la list le pipe
  return io;
}


/*return client.stream(
    'statuses/filter',
    { track: env.hashtag },
    stream => {
      stream.on('data', tweet => socket.emit('tweets', {
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
      );
      stream.on('error', error => console.log(error))
    }
  )*/
