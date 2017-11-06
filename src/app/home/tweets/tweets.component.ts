import { Tweet } from '../../models/tweet';
import { TweetView } from '../../models/tweet-view';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Fifo } from './tweet/fifo/Fifo';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export default class Tweets implements OnInit {

  @Input() tweet: Observable<Tweet>;
  private queue: Fifo<TweetView> = new Fifo<TweetView>(3);
  public containerClass: string;

  constructor(private zone: NgZone) {
    this.queue.beforePush = this.willShiftTweet.bind(this);
    this.queue.afterPush = this.didShiftTweet.bind(this);
  }

  ngOnInit() {
    this.tweet.subscribe((item: Tweet) => this.zone.run(() =>
      this.queue.push(new TweetView(item))
    ));
  }

  willShiftTweet(): Promise<any> {
    this.containerClass = 'willMove';
    return new Promise(resolve => {
      setTimeout(() => {
          this.containerClass = 'didMoved';
          resolve();
        }, 2000
      )
    });

  }

  didShiftTweet(): Promise<any> {
    return Promise.resolve();
  }

  trackTweet(index, tweetView: TweetView) {
    return tweetView.id;
  }
}
