// import puppeteer from "@cloudflare/puppeteer";

// export default {
//   async fetch(request, env) {
//     const browser = await puppeteer.launch(env.MYBROWSER);
//     const page = await browser.newPage();

//     const cookies =
//     [
//       {
//         name: 'cookie1',
//         value: 'value1',
//         domain: 'example.com',
//         path: '/',
//       },
//       {
//         name: 'cookie2',
//         value: 'value2',
//         domain: 'example.com',
//         path: '/',
//         httpOnly: true,
//         secure: true,
//       },
//     ];
//     await page.setCookie(...cookies);

//     await page.goto("https://example.com");

//     const metrics = await page.metrics();

//     await browser.close();
//     return Response.json(metrics);
// 	  // return new Response('Hello World!');
//   },
// };

import puppeteer from '@cloudflare/puppeteer';

export default {
	async fetch(request, env) {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();

		// const cookies = [
		// 	{
		// 		creation_time: '1747184492',
		// 		domain: '.webhook17.gadget.app',
		// 		name: 'session',
		// 		value:
		// 			'vGfr4qaLNHjXNzUboFIYOLgE1h0pNbUzkFZuT8%2BTIa7xTp2fRjpX0e1wKu6UKLU%2F%2BieDZAtCfjJs7zw3TJSqYo2m37Ff9RS5ngodFy2oJfQOP%2BTRGSVDIkg%2FFQ%3D%3D%3BI97ygsuaAOJ57IvCTno%2FUo7uTp7c900U',
		// 		path: '/',
		// 		expiration_time: '1747789292',
		// 		last_access_time: '0',
		// 		secure: true,
		// 		http_only: true,
		// 		same_site: '0',
		// 		priority: '1',
		// 		source_scheme: '2',
		// 		source_port: '443',
		// 		is_host_cookie: false,
		// 	},
		// ];
		const cookies = [
			{
				name: 'session',
				value:
					'vGfr4qaLNHjXNzUboFIYOLgE1h0pNbUzkFZuT8%2BTIa7xTp2fRjpX0e1wKu6UKLU%2F%2BieDZAtCfjJs7zw3TJSqYo2m37Ff9RS5ngodFy2oJfQOP%2BTRGSVDIkg%2FFQ%3D%3D%3BI97ygsuaAOJ57IvCTno%2FUo7uTp7c900U',
				domain: '.webhook17.gadget.app',
				path: '/',
				expires: 1747789292, // Unix timestamp in seconds
				httpOnly: true,
				secure: true,
				sameSite: 'None', // Assuming this aligns with your intent
			},
		];
		await page.setCookie(...cookies);

		await page.goto('https://webhook17.gadget.app/edit/development/settings');

		// await page.click('#buttonId');
		await page.waitForXPath("//button[span[text()='Enable TypeScript']]");
		const [button] = await page.$x("//button[span[text()='Enable TypeScript']]");
		await button.click();

		// await page.click('#buttonId');
		await page.waitForXPath("//button[span[text()='Confirm']]");
		const [button2] = await page.$x("//button[span[text()='Confirm']]");
		await button2.click();

		await page.waitForTimeout(500);

		await browser.close();

		return new Response('Done!');
	},
};
