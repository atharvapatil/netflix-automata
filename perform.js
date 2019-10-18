const puppeteer = require('puppeteer');
const randomInt = require('random-int');
var randomWords = require('random-words');
require('dotenv').config()
var seedInt = 0;
var googleThis = ['This is not the end', 'Is this the end', 'what is reality?'];

Automata();

async function Automata(){

  console.log('Beigning the script');

  console.log('Genrating a random number for the tab tubby tab count');

  seedInt = randomInt(19, 40);

  console.log('Here\'\s the tab tubby number: ' + seedInt);

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720
  });
  await page.goto('https://netflix.com');
  await page.waitFor('#appMountPoint > div > div > div > div > div > div.our-story-header-wrapper > div > a');
  await page.click('#appMountPoint > div > div > div > div > div > div.our-story-header-wrapper > div > a');

  await page.waitFor('#id_userLoginId');
  await page.waitFor('#id_password');
  await page.type('#id_userLoginId', process.env.USERNAME);
  await page.type('#id_password', process.env.PASSWORD);
  await page.keyboard.press('Enter');

  console.log('attempting login');

  await page.waitFor('#appMountPoint > div > div > div:nth-child(1) > div > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div')

  console.log('Starting to select profile');

  for(let chooseAccount = 0; chooseAccount < 4; chooseAccount++){
    await page.keyboard.press('Tab');
  }

  console.log('profile selected');

  await page.keyboard.press('Enter');

  await page.waitFor('#appMountPoint > div > div > div:nth-child(1) > div > div.mainView');



  for(let selectingMovie = 0; selectingMovie < seedInt; selectingMovie++){
    await page.keyboard.press('Tab');
  }

  console.log('Going to a random title');

  await page.keyboard.press('Enter');

  console.log('Waiting for the title assets to load');

  await page.waitFor(3000);

  await page.keyboard.press('Tab');

  console.log('Begining movie');

  await page.keyboard.press('Enter');

  await page.waitFor(1000);

  // This is the second page coming

  const pageTwo = await browser.newPage();

  await pageTwo.waitFor(1000);

  await pageTwo.goto('https://google.com');

//   googleThis = await randomWords(13);
//   console.log(googleThis);

  for (i = 0; i < googleThis.length; i++) {

    const page = await browser.newPage();

    await page.setViewport({
      width: 1280,
      height: 720
    });

    await page.goto('https://www.google.com');
    await page.type('#main', googleThis[i]);
    await page.keyboard.press("Enter");
    await page.waitFor('#rso > div > div > div:nth-child(1) > div > div > div.r a');
    await page.click('#rso > div > div > div:nth-child(1) > div > div > div.r a');

    await page.waitFor(3000);

  }

}
