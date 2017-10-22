import { async, TestBed } from '@angular/core/testing'
import { BrowserModule, By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Tweet } from '../../models/tweet'
import TweetComponent from './tweet/tweet.component'
import { Observable } from 'rxjs/Observable'
import like from './tweet/like/like.component'
import retweet from './tweet/retweet/retweet.component'
import tweets from './tweets.component'
import 'rxjs/add/observable/of'

describe('TweetsStream', () => {

  let comp: tweets;
  let fixture;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [tweets, TweetComponent, like, retweet],
        imports: [BrowserModule]
      }).compileComponents()
      fixture = TestBed.createComponent(tweets)
      comp = fixture.componentInstance
    })
  )

  // now component render component one by one
  xit(
    'should render four tweets',
    async(() => {
      // given
      const aTweet = new Tweet('/avat.png', 'Tweet Content', 'my name', 'Mathieu', 3, 4, 5);
      comp.tweet = Observable.of(aTweet, aTweet, aTweet, aTweet);
      // when
      fixture.detectChanges() // trigger initial data binding

      // then
      const tweetsStream: DebugElement = fixture.debugElement.query(
        By.css('.tweets-stream')
      )
      expect(tweetsStream.queryAll(By.css('tweet')).length).toBe(1)
    })
  )

  it(
    'should render no tweets message',
    async(() => {
      // given
      comp.tweet = Observable.of()

      // when
      fixture.detectChanges() // trigger initial data binding

      // then
      const noTweets: DebugElement = fixture.debugElement.query(
        By.css('.no-tweets')
      )
      expect(noTweets).toBeTruthy()
    })
  )
})
