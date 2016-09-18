/*
 * Istanbulの結果をSummarizeしてSlackに通知するスクリプト
 * For CI
 */

const fs = require('fs');
const request = require('request');
const istanbul = require('istanbul');
const utils = istanbul.utils;

const collector = new istanbul.Collector();
const files = [
  'coverage/coverage-final.json',
];

try {
  files.forEach((file) => collector.add(JSON.parse(fs.readFileSync(file, 'utf8'))));
} catch (e) {
  throw new Error('Could not read all coverage files. Generate istanbul report first.');
}

const rawCoverage = collector.getFinalCoverage();
const globalResults = utils.summarizeCoverage(rawCoverage);

const coveragePct = globalResults.statements.pct;

const webhookUri = process.env.SLACK_URL;
if (!webhookUri) {
  console.log('$SLACK_URL is not set.');
  console.log(`Coverage: ${coveragePct}`);
}

const payload = {
  username: 'Coverage',
  text: `Coverage: ${coveragePct}`,
  icon_url: 'https://secure.gravatar.com/avatar/a08fc43441db4c2df2cef96e0cc8c045?s=140',
};

request.post({
  url: webhookUri,
  form: `payload=${JSON.stringify(payload)}`,
  json: true,
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body);
  } else {
    console.log(`error: ${response.statusCode} ${body}`);
  }
});
