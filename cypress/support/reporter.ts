#!/usr/bin/env node

import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as report from 'multiple-cucumber-html-reporter';
import * as path from 'path';

const cucumberJsonDir = './cypress/results';
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const htmlReportDir = './cypress/reports/html';
const screenshotsDir = './cypress/screenshots';

const getCucumberReportMaps = () => {
  const files = fs.readdirSync(cucumberJsonDir).filter(file => file.indexOf('.json') > -1);
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file)),
    );
    if (!json[0]) { return; }
    const [feature] = json[0].uri.split('/').reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
};

const addScreenshots = () => {
  // Prepend the given path segment
  const prependPathSegment = pathSegment => location => path.join(pathSegment, location);
  // fs.readdir but with relative paths
  const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location));
  // Recursive fs.readdir but with relative paths
  const readdirRecursive = location => readdirPreserveRelativePath(location)
    .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
      ? result.concat(readdirRecursive(currentValue))
      : result.concat(currentValue), []);
  const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => file.indexOf('.png') > -1);
  // Extract feature list from screenshot list
  const featuresList = Array.from(new Set(screenshots.map(x => x.match(/[\w-_.]+\.feature/g)[0])));
  featuresList.forEach((feature: any) => {
    screenshots.forEach(screenshot => {
      // regex to parse 'I can use scenario outlines with examples' from either of these:
      //   - Getting Started -- I can use scenario outlines with examples (example #1) (failed).png
      //   - Getting Started -- I can use scenario outlines with examples (failed).png
      //   - Getting Started -- I can use scenario outlines with examples.png
      const regex = /(?<=--\ ).+?((?=\ \(example\ #\d+\))|(?=\ \(failed\))|(?=\.\w{3}))/g;
      const [scenarioName] = screenshot.match(regex);
      // eslint-disable-next-line no-console
      console.info(chalk.blue('\n    Adding screenshot to cucumber-json report for'));
      // eslint-disable-next-line no-console
      console.info(chalk.blue(`    '${ scenarioName }'`));
      // Find all scenarios matching the scenario name of the screenshot.
      // This is important when using the scenario outline mechanism
      const myScenarios = cucumberReportMap[feature][0].elements.filter(
        e => scenarioName.includes(e.name),
      );
      if (!myScenarios) { return; }
      let foundFailedStep = false;
      myScenarios.forEach(myScenario => {
        if (foundFailedStep) {
          return;
        }
        let myStep;
        if (screenshot.includes('(failed)')) {
          myStep = myScenario.steps.find(
            step => step.result.status === 'failed',
          );
        } else {
          myStep = myScenario.steps.find(
            step => step.name.includes('screenshot'),
          );
        }
        if (!myStep) {
          return;
        }
        const data = fs.readFileSync(
          path.resolve(screenshot),
        );
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64');
          if (!myStep.embeddings) {
            myStep.embeddings = [];
            myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
            foundFailedStep = true;
          }
        }
      });
      //Write JSON with screenshot back to report file.
      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
        JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel),
      );
    });
  });
};

const generateReport = () => {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`WARNING: Folder './${ cucumberJsonDir }' not found. REPORT CANNOT BE CREATED!`));
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      reportPath: htmlReportDir,
      displayDuration: true,
      pageTitle: 'System-Test Report',
      reportName: `System-Test Report - ${ new Date().toLocaleString() }`,
      openReportInBrowser: true,
      metadata: {
        browser: {
          name: 'chrome',
        },
        device: 'Desktop',
        platform: {
          name: 'windows',
        },
      },
    });
  }
};

getCucumberReportMaps();
addScreenshots();
generateReport();
