import * as faker from "faker"
import { Tweet } from "../src/app/models/tweet"

const TWEET_COUNT = 20

const range = size => new Array(size).fill("")

export default range(TWEET_COUNT).map(
  () =>
    new Tweet(
      faker.lorem.sentence(),
      faker.internet.userName(),
      faker.date.recent(),
      faker.random.number(),
      faker.random.number()
    )
)
