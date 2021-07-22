const puppeteer = require("puppeteer");
const percySnapshot = require("@percy/puppeteer");

describe("Percy test", () => {
  let browser;
  let page;

  beforeAll(async function () {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });
  afterAll(async function () {
    await browser.close();
  });

  test("Remueve un elemento", async () => {
    await page.goto("https://www.example.com");
    await page.waitForSelector("h1");
    await page.evaluate(() => {
      (document.querySelectorAll("h1") || []).forEach((el) => el.remove());
    });
    await percySnapshot(page, "Ejemplo");
  });
});
