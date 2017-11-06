import { Tweet } from './Tweet';

export class TweetView {
  public id: number;

  constructor(public tweet: Tweet) {
    this.id = Date.now();
  }
}
