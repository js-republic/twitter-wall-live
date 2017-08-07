import { TestBed, async } from "@angular/core/testing"
import { BrowserModule, By } from "@angular/platform-browser"
import { NgModule, DebugElement } from "@angular/core"
import { TweetService } from "../../services/tweet"
import tweetsStream from "./tweets-stream.component"
import { Tweet } from "../../models/tweet"
import TweetComponent from "../tweet/tweet.component"
import { Observable } from "rxjs/Observable"
import like from "../like/like.component"
import retweet from "../retweet/retweet.component"
import "rxjs/add/observable/of"

describe("tweetsStream", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [tweetsStream, TweetComponent, like, retweet],
        imports: [BrowserModule]
      }).compileComponents()
      this.fixture = TestBed.createComponent(tweetsStream)
      this.comp = this.fixture.componentInstance
    })
  )

  it(
    "should render four tweets",
    async(() => {
      // given
      this.comp.tweet = Observable.of(
        new Tweet("a", "b", "b", "b", 3, 4, 5),
        new Tweet("a", "b", "b", "b", 3, 4, 5),
        new Tweet("a", "b", "b", "b", 3, 4, 5),
        new Tweet("a", "b", "b", "b", 3, 4, 5)
      )
      // when
      this.fixture.detectChanges() // trigger initial data binding

      // then
      const tweetsStream: DebugElement = this.fixture.debugElement.query(
        By.css(".tweets-stream")
      )
      expect(tweetsStream.queryAll(By.css("tweet")).length).toBe(4)
    })
  )

  it(
    "should render no tweets message",
    async(() => {
      // given
      this.comp.tweet = Observable.of()

      // when
      this.fixture.detectChanges() // trigger initial data binding

      // then
      const noTweets: DebugElement = this.fixture.debugElement.query(
        By.css(".no-tweets")
      )
      expect(noTweets).toBeTruthy()
    })
  )
})
