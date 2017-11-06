export class Tweet {
  constructor(public avatar: string,
              public text: string,
              public name: string,
              public username: string,
              public creationDate: number,
              public likeCount: number,
              public retweetCount: number) {
  }

  static fromJSON(item) {
    return new Tweet(
      item.avatar,
      item.text,
      item.name,
      item.username,
      item.creationDate,
      item.likeCount,
      item.retweetCount
    )
  }
}
