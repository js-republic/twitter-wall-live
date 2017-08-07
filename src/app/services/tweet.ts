import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Tweet } from "../models/tweet"
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import io from "socket.io-client"
import { Subject } from "rxjs/Subject"

const socket = io()

@Injectable()
export class TweetService {
  private tweetSource = new Subject<Tweet>()
  tweet: Observable<Tweet> = this.tweetSource.asObservable()
  constructor() {
    socket.on("tweets", data => {
      this.tweetSource.next(data.tweet)
    })
  }
}
