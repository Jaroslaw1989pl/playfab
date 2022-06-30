// 3rd party modules
const puppeteer = require('puppeteer');

class Puppeteer {

  constructor() {

  }

  async crawler() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport(1400, 900);
    await page.goto('https://whatismyipaddress.com/');
    await page.screenshot({ path: '/app/parser_data/example.png' });
    await browser.close();
  }
}

module.exports = Puppeteer;