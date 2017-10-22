import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import Home from './home.component';
import Tweets from './tweets/tweets.component';
import Tweet from './tweets/tweet/tweet.component';
import Like from './tweets/tweet/like/like.component';
import Retweet from './tweets/tweet/retweet/retweet.component';

import { TweetService } from './services/tweet.service';

const routes: Routes = [
  { path: '', component: Home },
];

@NgModule({
  declarations: [
    Home,
    Tweets,
    Tweet,
    Like,
    Retweet,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [TweetService]
})
export class HomeModule {
}
