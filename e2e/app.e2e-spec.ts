import { TwitterWallPage } from './app.po';

describe('twitter-wall App', () => {
  let page: TwitterWallPage;

  beforeEach(() => {
    page = new TwitterWallPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
