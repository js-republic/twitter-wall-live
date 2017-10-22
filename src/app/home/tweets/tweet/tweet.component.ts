import { Tweet } from '../../../models/tweet'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export default class tweet {
  @Input() tweet: Tweet;
}
