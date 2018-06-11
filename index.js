const request = require('request');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const { writeFile, createWriteStream } = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(writeFile);

if (!process.env.URL) {
  console.log('Please provide an URL');
  process.exit(1);
}

(async () => {
  console.log(`Running Lighthouse against ${process.env.URL}\n`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: '/usr/bin/chromium-browser'
  });

  const results = await lighthouse(process.env.URL, {
    port: (new URL(browser.wsEndpoint())).port,
    output: 'json',
    logLevel: 'error'
  });

  const fileData = JSON.stringify(results, null, 2);
  await writeFileAsync('/lighthouse-results/latest.json', fileData, 'utf8');
  await writeFileAsync(`/lighthouse-results/${new Date().toISOString()}.json`, fileData, 'utf8');

  console.log(`Lighthouse results for ${process.env.URL}\n`);
  console.log(`${results.reportCategories.map(c => `${c.id}=${c.score.toFixed(2)}%`).join('\n')}`);

  if (process.env.withBadges) {
    const download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        request(uri).pipe(createWriteStream(filename)).on('close', callback);
      });
    };
    await Promise.all(results.reportCategories.reduce((promises, c) => {
      promises.push(new Promise(resolve => {
        download(`https://lighthouse-badge.appspot.com/?score=${c.score}&category=${c.id}`, `/lighthouse-results/${new Date().toISOString()}-${c.id}.svg`, resolve)
      }));
      promises.push(new Promise(resolve => {
        download(`https://lighthouse-badge.appspot.com/?score=${c.score}&compact&category=${c.id}`, `/lighthouse-results/${new Date().toISOString()}-${c.id}-compact.svg`, resolve)
      }));

      return promises;
    }, []));
  }

  process.exit(0);
})();
