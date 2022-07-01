const { format_date, format_plural, format_url } = require("../utils/helpers");

test("format_date() returns a date string", () => {
  const date = new Date("2020-05-30 16:12:03");

  expect(format_date(date)).toBe("5/30/2020");
});

test("format_plural() returns tigers", () => {
  const inputTest = format_plural("tiger", 2);

  expect(inputTest).toBe("tigers");
});

test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/alphafottage/');
    const url3 = format_url('https://www.starwars.com?q=helloworld');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('starwars.com');
});