import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../models/tweet';
import { Configuration } from '../models/configuration';
import { ConfigurationService } from '../services/configuration.service';
import { TweetService } from './services/tweet.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class TweetsPage {
  tweet: Observable<Tweet>;
  configuration: Configuration;

  constructor(private tweetService: TweetService,
              private configurationService: ConfigurationService) {
    this.tweet = this.tweetService.tweet;
    this.configurationService.get().subscribe((conf) => this.configuration = conf)
  }
}
