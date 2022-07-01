const { format_date, format_plural } = require("../utils/helpers");

test("format_date() returns a date string", () => {
  const date = new Date("2020-05-30 16:12:03");

  expect(format_date(date)).toBe("5/30/2020");
});

test("format_plural() returns tigers", () => {
  const inputTest = new Input("Tiger", 2);

  expect(format_plural(inputTest).toBe("tigers"));
});
