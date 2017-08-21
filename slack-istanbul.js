/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
