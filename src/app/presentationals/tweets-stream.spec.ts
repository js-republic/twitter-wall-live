import { TestBed, async } from "@angular/core/testing"
import { BrowserModule, By } from "@angular/platform-browser"
import { NgModule, DebugElement } from "@angular/core"
import { AppComponent } from "../app.component"
import { TweetService } from "../services/tweet"
import tweetsStream from "./tweets-stream.component"
import { Tweet } from "../models/tweet"

describe("tweetsStream", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [tweetsStream],
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
      this.comp.tweets = [
        new Tweet("a", "b", 3, 4, 5),
        new Tweet("a", "b", 3, 4, 5),
        new Tweet("a", "b", 3, 4, 5),
        new Tweet("a", "b", 3, 4, 5)
      ]

      // when
      this.fixture.detectChanges() // trigger initial data binding

      // then
      const ul: DebugElement = this.fixture.debugElement.query(By.css("ul"))
      expect(ul.children.length).toBe(4)
    })
  )

  it(
    "should render no tweets message",
    async(() => {
      // given
      this.comp.tweets = []

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
