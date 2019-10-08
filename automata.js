
const puppeteer = require('puppeteer');
const randomInt = require('random-int');
var seedInt = 0;

console.log(process.env.SECRET_MESSAGE);

NetflixAutomata();

async function NetflixAutomata(){

  console.log('Beigning the script');

  console.log('Genrating a random number for the tab tubby tab count');
  
  seedInt = randomInt(19, 60);

  console.log('Here\'\s the tab tubby number: ' + seedInt);

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
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
  await page.type('#id_userLoginId', '');
  await page.type('#id_password', '');
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

}