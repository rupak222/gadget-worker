import puppeteer from '@cloudflare/puppeteer';

/*
----------------------- DON'T LOGOUT FROM GADGET ACCOUNT, ELSE SESSION WILL NOT WORKED -----------------------------------
*/
export default {
  async fetch(request, env) {
    const browser = await puppeteer.launch(env.MYBROWSER);

    // === FIRST PAGE ===
    const page1 = await browser.newPage();
    const cookies1 = [
      {
        name: 'session',
        value:
          'sWh5FbjjaSzZiLfIrLH07a0%2FWb4DaHoZKNczmfMoXBHN%2BrWxIlg29JEgWufFhnp7zJnUezaadCycd3RXM3zGuHVWn5GPFMgDZVUHwSojEKj8MC0cX1J%2BeNZFLeg%3D%3BuwW6G1hAamtI6vmLvHXdd79SFfon3Jmo',
        domain: '.customcode-in.gadget.app',
        path: '/',
        expires: 1748428843, // Wednesday, May 28, 2025 at 4:10:43 PM
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      },
    ];
    await page1.setViewport({ width: 1920, height: 1080 });
    await page1.setCookie(...cookies1);
    await page1.goto('https://customcode-in.gadget.app/edit/development', {
      waitUntil: 'networkidle2',
    });

    // optional pause
    await new Promise((r) => setTimeout(r, 1000));

    const screenshot = await page1.screenshot({ fullPage: true, type: 'png' });
		return new Response(screenshot, { headers: { 'Content-Type': 'image/png' } });

    // === SECOND PAGE ===
    // const page2 = await browser.newPage();
    // const cookies2 = [
    //   {
    //     name: 'session',
    //     value: 'EhKP60UXE14hutdfD3rznAlRZhaXbftwa1jlCXHVbWJmoMOR7YR1AFsuozjz8hW37bsLf5EoK%2Fbe3cD8zcuPCXxlR8BnhsAUtLHK7splP6GyYRTaNVBAX0vMMNw%3D%3BaZmEmQwLCVOpciD9a9UEbwPL6jEo5Bgk',
    //     domain: '.customcode-pk.gadget.app',
    //     path: '/',
    //     expires: 1748012673, // Friday, May 23, 2025 8:34:33 PM
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'None',
    //   },
    // ];
    // await page2.setViewport({ width: 1920, height: 1080 });
    // await page2.setCookie(...cookies2);
    // await page2.goto('https://customcode-pk.gadget.app/edit/development', {
    //   waitUntil: 'networkidle2',
    // });

    // // again, optional pause
    // await new Promise((r) => setTimeout(r, 1000));

    // await browser.close();
    // return new Response('Done!');
  },
};
