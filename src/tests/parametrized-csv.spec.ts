import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { parse } from 'csv-parse/sync';

const csvData = fs.readFileSync(path.resolve("./src/test-data/test-data.csv")).toString();

const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ","
});

/**
    [
        { param1: 'TC001', param2: 'fruit', param3: 'apple' },
        { param1: 'TC002', param2: 'veg', param3: 'tomato' }
    ]
*/
  
for (const record of records) {
    test(`foo: ${record.TC_NAME}`, async ({ page }) => {
        await page.goto('https://www.google.co.in/');
        await page.getByLabel('Search', { exact: true }).click();
        await page.getByLabel('Search', { exact: true }).fill(record.TOPIC);
        await page.getByLabel('Google Search').first().click();
        await page.getByRole('combobox', { name: 'Search' }).fill(record.DATA);
        await page.getByRole('button', { name: 'Search', exact: true }).click();
    });
}