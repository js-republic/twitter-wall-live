import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { CommonModule } from "@angular/common"
import { TweetsPage } from "./tweets-page.component"
import tweetsStream from "./presentationals//tweets-stream/tweets-stream.component"
import { TweetService } from "./services/tweet"
import tweet from "./presentationals/tweet/tweet.component"
import retweet from "./presentationals/retweet/retweet.component"
import like from "./presentationals/like/like.component"
import { AppComponent } from "./app.component"
import { RouterModule, Routes } from "@angular/router"
import { AdminForm } from "./presentationals/admin-form/admin-form.component"
import AdminComponent from "./presentationals/admin-page/admin-page.component"
import { ConfigurationService } from "./services/configuration"
import { FormsModule } from "@angular/forms"
const appRoutes: Routes = [
  { path: "", component: TweetsPage },
  {
    path: "admin",
    component: AdminComponent
  }
  // { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TweetsPage,
    tweetsStream,
    AdminComponent,
    tweet,
    like,
    retweet,
    AdminForm
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [TweetService, ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
