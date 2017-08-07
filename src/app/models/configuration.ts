export class Configuration {
  constructor(public hashtag: string) {}
  static fromJSON(item) {
    return new Configuration(item.hashtag)
  }
}
