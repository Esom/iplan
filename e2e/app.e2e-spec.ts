import { IplanPage } from './app.po';

describe('iplan App', function() {
  let page: IplanPage;

  beforeEach(() => {
    page = new IplanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
