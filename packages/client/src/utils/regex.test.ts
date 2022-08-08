import { emailRegex, youtubeUrlRegex } from './regex';

describe('RegExp: Youtube URL', function () {
  it('should match the expected youtube url', function () {
    const uri = 'http://google.com:4443/';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 2', function () {
    const uri = 'https://facebook.com/';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 3', function () {
    const uri = 'http://localhost:3000';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 4', function () {
    const uri = 'thaycacac';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 5', function () {
    const uri = 'thaycacac@gmail.com';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 6', function () {
    const uri = '12345678';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 7', function () {
    const uri = 'https://www.youtube.com';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 8', function () {
    const uri = 'https://studio.youtube.com/';
    expect(youtubeUrlRegex.test(uri)).toBe(false);
  });
  it('should match the expected youtube url 9', function () {
    const uri =
      'https://www.youtube.com/watch?v=aplTmzoy3b8&ab_channel=ZuongZeroStudio';
    expect(youtubeUrlRegex.test(uri)).toBe(true);
  });
});

describe('RegExp: Email', function () {
  it('should match the expected email', function () {
    const uri = 'http://google.com:4443/';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 2', function () {
    const uri = 'https://facebook.com/';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 3', function () {
    const uri = 'http://localhost:3000';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 4', function () {
    const uri = 'thaycacac';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 5', function () {
    const uri = 'thaycacac@gmail.com';
    expect(emailRegex.test(uri)).toBe(true);
  });
  it('should match the expected email 6', function () {
    const uri = '12345678';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 7', function () {
    const uri = 'https://www.youtube.com';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 8', function () {
    const uri = 'https://studio.youtube.com/';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 9', function () {
    const uri =
      'https://www.youtube.com/watch?v=aplTmzoy3b8&ab_channel=ZuongZeroStudio';
    expect(emailRegex.test(uri)).toBe(false);
  });
  it('should match the expected email 10', function () {
    const uri = 'hoapn3@fsoft.com.vn';
    expect(emailRegex.test(uri)).toBe(true);
  });
  it('should match the expected email 11', function () {
    const uri = 'hoapnse05740@fpt.edu.vn';
    expect(emailRegex.test(uri)).toBe(true);
  });
});
