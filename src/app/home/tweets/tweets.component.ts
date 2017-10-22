import { Tweet } from '../../models/tweet'
import { Component, Input, NgZone, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export default class tweets implements OnInit {
  @Input() tweet: Observable<Tweet>;
  tweets: Tweet[];

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    this.tweet.subscribe(data => {
      this.zone.run(() => {
        this.tweets = [data];
      });
    });
  }
}
