import * as faker from "faker";
import { Tweet } from "../src/app/models/tweet";

const TWEET_COUNT = 20;

const range = size => new Array(size).fill("");

export default () => new Tweet(
  faker.image.avatar(),
  faker.lorem.sentence(),
  faker.name.firstName(),
  faker.internet.userName(),
  faker.date.recent(),
  faker.random.number(),
  faker.random.number()
);
