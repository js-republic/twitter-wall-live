import { Tweet } from '../../models/tweet'
import { Component, Input, NgZone, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import CapedQueue from './CapedQueue';

class TweetView {
  constructor(public tweet: Tweet,
              public index: number,
              public left: number = 0) {
  }
}

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export default class Tweets implements OnInit {
  @Input() tweet: Observable<Tweet>;
  private queue: CapedQueue<TweetView> = new CapedQueue<TweetView>(3);

  constructor(private zone: NgZone) {
    this.queue.beforeShift.subscribe(this.willShiftTweet.bind(this));
    this.queue.afterShift.subscribe(this.didShiftTweet.bind(this));
  }

  ngOnInit() {
    this.tweet.subscribe((item: Tweet) => {
      this.zone.run(() => {
        this.queue.push(new TweetView(item, this.queue.length));
      });
    });
  }

  willShiftTweet(view: TweetView) {
    //view.left = (this.queue.length >= 1 && view.index === 0) ? -70 : 0;
    view.index--;
  }

  didShiftTweet(view: TweetView) {

  }

  trackTweet(index, tweetView: TweetView) {
    return tweetView.tweet.id;
  }
}
