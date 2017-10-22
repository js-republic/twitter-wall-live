import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(
  process.env,
  {
    TWITTER_CONSUMER_KEY: str(),
    TWITTER_CONSUMER_SECRET: str(),
    TWITTER_TOKEN_KEY: str(),
    TWITTER_TOKEN_SECRET: str(),
    HASHTAG: str(),
    PORT: port()
  },
  { strict: true }
);
