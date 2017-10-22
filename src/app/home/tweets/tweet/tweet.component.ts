import { Tweet } from '../../../models/tweet'
import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: "tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.css"]
})
export default class tweet {
  @Input() tweet: Observable<Tweet>
}
