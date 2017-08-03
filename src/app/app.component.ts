import { Component } from "@angular/core"
import { TweetService } from "./services/tweet"
import { Tweet } from "./models/tweet"
import { Observable } from "rxjs/Observable"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private tweetService: TweetService) {
    this.tweet = this.tweetService.tweet.map(tweet => {
      return tweet
    })
  }
  tweet: Observable<Tweet>
}
