import puppeteer from '@cloudflare/puppeteer';

export default {
	async fetch(request, env) {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();

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
				sameSite: 'None',
			},
		];
		await page.setCookie(...cookies);

		// Set the viewport to 1920x1080
		await page.setViewport({ width: 1920, height: 1080 });

		await page.goto('https://webhook17.gadget.app/edit/development/settings', { waitUntil: 'networkidle2' });


		await page.evaluate(() => {
			const span = Array.from(document.querySelectorAll('span')).find((el) => el.textContent === 'Enable TypeScript');
			if (span) span.click();
		});

        await page.evaluate(() => {
			const span = Array.from(document.querySelectorAll('span')).find((el) => el.textContent === 'Confirm');
			if (span) span.click();
		});

		// const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
        await new Promise(resolve => setTimeout(resolve, 2000));
		await browser.close();
		// return new Response(screenshot, { headers: { 'Content-Type': 'image/png' } });
        return new Response("Done!");
	},
};
