const puppeteer = require('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')

expect.extend({toMatchImageSnapshot})

describe('Visual Testing',()=>{
let browser;
let page;

beforeAll(async function(){

	browser = await puppeteer.launch({headless: false})
	page = await browser.newPage()

})
afterAll(async function(){

	await browser.close()

})

test('Captura de pantalla completa',async()=>{
     await page.goto('https://www.example.com')
     await page.waitForSelector('h1')
     const image = await page.screenshot()
     expect(image).toMatchImageSnapshot({
	     failureThresholdType: 'pixel',
	     failureThreshold: '500',
     })

})
test('Captura de pantalla de un elemento en especifico',async()=>{
	await page.goto('https://www.example.com')
	const h1  = await page.waitForSelector('h1')
	await page.waitForSelector('h1')
	const image = await page.screenshot()
	expect(image).toMatchImageSnapshot({
		failureThresholdType: 'percent',
		failureThreshold: 0.01,
	})
   
  }) 
 
  test('Iphone Snapshot',async()=>{
	await page.goto('https://www.example.com')
	await page.waitForSelector('h1');
	await page.emulate(puppeteer.devices['iPad landscape'])
	const image = await page.screenshot();
	expect(image).toMatchImageSnapshot({
		failureThresholdType: "pixel",
		failureThreshold: 500,
	})

  })   
})