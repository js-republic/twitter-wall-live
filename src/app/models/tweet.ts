export class Tweet {
  constructor(public text: string) // public author: string,
  // public creationDate: number,
  // public likeCount: number,
  // public retweetCount: number
  {
  }
  static fromJSON(item) {
    return new Tweet(
      item.text
      // item.author,
      // item.creationDate,
      // item.likeCount,
      // item.retweetCount
    )
  }
}
