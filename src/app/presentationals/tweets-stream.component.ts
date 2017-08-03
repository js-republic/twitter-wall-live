import { Tweet } from "../models/tweet"
import { Component, Input, OnInit, NgZone } from "@angular/core"
import { Observable } from "rxjs/Observable"

@Component({
  selector: "tweets-stream",
  templateUrl: "./tweets-stream.component.html",
  styleUrls: ["./tweets-stream.component.css"]
})
export default class tweetsStream implements OnInit {
  @Input() tweet: Observable<Tweet>
  tweets: Tweet[] = []
  constructor(private zone: NgZone) {}
  ngOnInit() {
    this.tweet.subscribe(tweet => {
      this.zone.run(() => {
        this.tweets = this.tweets.concat(tweet)
      })
    })
  }
}
