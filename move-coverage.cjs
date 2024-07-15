/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */
 
const fs = require('fs-extra');
 
const REPORTS_FOLDER = 'reports';
const FINAL_OUTPUT_FOLDER = 'coverage-final';
 
// Create the reports folder and move the reports from cypress and jest inside it
await fs.emptyDir(REPORTS_FOLDER);
await fs.copyFile(
  'coverage/cypress/coverage-final.json',
  `${REPORTS_FOLDER}/from-cypress.json`
);
await fs.copyFile(
  'coverage/unit/coverage-final.json',
  `${REPORTS_FOLDER}/from-vitest.json`
);
 
await fs.emptyDir(".nyc_output");
await fs.emptyDir(FINAL_OUTPUT_FOLDER);