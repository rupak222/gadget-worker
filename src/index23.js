import puppeteer from '@cloudflare/puppeteer';

export default {
    async fetch(request, env) {
        try {
            // Launch the browser using the Cloudflare Worker binding
            const browser = await puppeteer.launch(env.MYBROWSER);
            const page = await browser.newPage();

            // Set any necessary cookies (example properties included)
            const cookies = [
                {
                    name: 'session',
                    value: 'your-session-value-here',
                    domain: '.webhook17.gadget.app',
                    path: '/',
                    expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                },
            ];
            await page.setCookie(...cookies);

            // Navigate to the target page
            await page.goto('https://webhook17.gadget.app/edit/development/settings', {
                waitUntil: 'networkidle0', // Wait until the network is idle
            });

            // Wait for the "Enable TypeScript" button
            await page.waitForFunction(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                return buttons.some(button => {
                    const span = button.querySelector('span');
                    return span && span.textContent === 'Enable TypeScript';
                });
            }, { timeout: 10000 }); // 10-second timeout

            // Click the "Enable TypeScript" button
            const enableClicked = await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const targetButton = buttons.find(button => {
                    const span = button.querySelector('span');
                    return span && span.textContent === 'Enable TypeScript';
                });
                if (targetButton) {
                    targetButton.click();
                    return true;
                }
                return false;
            });
            if (!enableClicked) throw new Error('Enable TypeScript button not found');

            // Wait for the "Confirm" button
            await page.waitForFunction(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                return buttons.some(button => {
                    const span = button.querySelector('span');
                    return span && span.textContent === 'Confirm';
                });
            }, { timeout: 10000 });

            // Click the "Confirm" button
            const confirmClicked = await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const targetButton = buttons.find(button => {
                    const span = button.querySelector('span');
                    return span && span.textContent === 'Confirm';
                });
                if (targetButton) {
                    targetButton.click();
                    return true;
                }
                return false;
            });
            if (!confirmClicked) throw new Error('Confirm button not found');

            // Optional: Wait for any resulting actions to complete
            await page.waitForTimeout(2000);

            // Clean up by closing the browser
            await browser.close();

            // Return a success response
            return new Response('Successfully completed the task!', { status: 200 });
        } catch (error) {
            // Return an error response if something goes wrong
            return new Response(`Error: ${error.message}`, { status: 500 });
        }
    },
};