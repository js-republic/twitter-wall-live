import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { AppComponent } from "./app.component"
import tweetsStream from "./presentationals/tweets-stream.component"
import { TweetService } from "./services/tweet"

@NgModule({
  declarations: [AppComponent, tweetsStream],
  imports: [BrowserModule, HttpModule],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule {}
