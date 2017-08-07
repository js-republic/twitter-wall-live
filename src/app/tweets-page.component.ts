import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { TweetService } from "./services/tweet"
import { Tweet } from "./models/tweet"
import { Observable } from "rxjs/Observable"

@Component({
  selector: "tweets-page",
  templateUrl: "./tweets-page.component.html",
  styleUrls: ["./tweets-page.component.css"]
})
export class TweetsPage {
  constructor(private tweetService: TweetService) {
    this.tweet = this.tweetService.tweet
  }
  tweet: Observable<Tweet>
}
