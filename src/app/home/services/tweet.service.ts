import { Injectable } from '@angular/core';
import { Tweet } from '../../models/tweet';
import io from 'socket.io-client';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TweetService {
  private tweetSource = new Subject<Tweet>();
  public tweet: Observable<Tweet> = this.tweetSource.asObservable();

  constructor() {
    const socket = io({
      path: '/tweet'
    });
    socket.on('tweet', (data: { tweet }) => {
      this.tweetSource.next(Tweet.fromJSON(data.tweet));
    });
  }
}
