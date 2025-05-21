import puppeteer from '@cloudflare/puppeteer';

export default {
	async scheduled(controller, env, ctx) {
	// async fetch(request, env) {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();

		const cookies = [
			{
				name: 'session',
				value:
					'4yBhswaLTxXgi4gz10p%2Bib%2FBiYK3pyhUBB%2FCxnvyRtdcIh%2BES3IvH%2F2SFcDDBkUUaOdszwtKNcz8IOMeIWYjXy96ZXE7dRblhZa1I%2Fp1sTpiz5iydSZZGCf%2B1Q%3D%3D%3BGL50F95UrPqjpTLw6CgELsqzkxlw8KGN',
				domain: '.customcode-in.gadget.app',
				path: '/',
				expires: 1774031514, // Unix timestamp in seconds
				httpOnly: true,
				secure: true,
				sameSite: 'None',
			},
		];
		await page.setCookie(...cookies);

		// Set the viewport to 1920x1080
		await page.setViewport({ width: 1920, height: 1080 });

		// await page.goto('https://webhook17.gadget.app/edit/development/settings', { waitUntil: 'networkidle2' });
		await page.goto('https://customcode-in.gadget.app/edit/development', { waitUntil: 'networkidle2' });

		// await page.evaluate(() => {
		// 	const span = Array.from(document.querySelectorAll('span')).find((el) => el.textContent === 'Enable TypeScript');
		// 	if (span) span.click();
		// });

		// await page.evaluate(() => {
		// 	const span = Array.from(document.querySelectorAll('span')).find((el) => el.textContent === 'Confirm');
		// 	if (span) span.click();
		// });

		// const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
		// await new Promise((resolve) => setTimeout(resolve, 2000));
        await new Promise((resolve) => setTimeout(resolve, 2000));
		await browser.close();
		// return new Response(screenshot, { headers: { 'Content-Type': 'image/png' } });
		return new Response('Done!');









		// const screenshot = await page1.screenshot({ fullPage: true, type: 'png' });
		// return new Response(screenshot, { headers: { 'Content-Type': 'image/png' } });
	},
};
