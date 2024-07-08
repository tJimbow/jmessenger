/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */
 
const fs = require('fs-extra');
 
const REPORTS_FOLDER = 'reports';
const FINAL_OUTPUT_FOLDER = 'coverage-final';
 
// Create the reports folder and move the reports from cypress and jest inside it
fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
  'coverage/cypress/coverage-final.json',
  `${REPORTS_FOLDER}/from-cypress.json`
);
fs.copyFileSync(
  'coverage/unit/coverage-final.json',
  `${REPORTS_FOLDER}/from-vitest.json`
);
 
fs.emptyDirSync(".nyc_output");
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);