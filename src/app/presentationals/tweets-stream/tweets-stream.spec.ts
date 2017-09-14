import { TestBed, async } from "@angular/core/testing"
import { BrowserModule, By } from "@angular/platform-browser"
import { NgModule, DebugElement } from "@angular/core"
import { TweetService } from "../../services/tweet"
import { Tweet } from "../../models/tweet"
import TweetComponent from "../tweet/tweet.component"
import { Observable } from "rxjs/Observable"
import like from "../like/like.component"
import retweet from "../retweet/retweet.component"
import tweetsStream from "./tweets-stream.component"
import "rxjs/add/observable/of"

describe("TweetsStream", () => {

  let comp:tweetsStream;
  let fixture;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [tweetsStream, TweetComponent, like, retweet],
        imports: [BrowserModule]
      }).compileComponents()
      fixture = TestBed.createComponent(tweetsStream)
      comp = fixture.componentInstance
    })
  )

  // now component render component one by one
  xit(
    "should render four tweets",
    async(() => {
      // given
      const aTweet =new Tweet("/avat.png", "Tweet Content", "my name", "Mathieu", 3, 4, 5);
      comp.tweet = Observable.of(aTweet, aTweet, aTweet,aTweet);
      // when
      fixture.detectChanges() // trigger initial data binding

      // then
      const tweetsStream: DebugElement = fixture.debugElement.query(
        By.css(".tweets-stream")
      )
      expect(tweetsStream.queryAll(By.css("tweet")).length).toBe(1)
    })
  )

  it(
    "should render no tweets message",
    async(() => {
      // given
      comp.tweet = Observable.of()

      // when
      fixture.detectChanges() // trigger initial data binding

      // then
      const noTweets: DebugElement = fixture.debugElement.query(
        By.css(".no-tweets")
      )
      expect(noTweets).toBeTruthy()
    })
  )
})
