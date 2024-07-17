import { chromium, expect as pwExpect, Expect, request, APIResponse, Page } from "@playwright/test";
import { config } from "dotenv";
import chai, { expect, should, util } from "chai"
import { resolve } from "path";
import { dialogListener, pageCloseListener } from "./page-listeners";
chai.use(require('chai-string'));
config();

declare global {
    export namespace PlaywrightTest {
        export interface Matchers<R, T = unknown> {
        }
    }
}

const extendExpect = () => {

    // custom-matchers.js
    pwExpect.extend({
        async toBeVisible(received) {
            const isVisible = await received.isVisible();
            if (isVisible) {
                return {
                    pass: true,
                    message: () => `Expected ${received} to not be visible`,
                };
            } else {
                return {
                    pass: false,
                    message: () => `Expected ${received} to be visible`,
                };
            }
        },

        async toHaveText(received, expected) {
            const actualText = await received.textContent();
            if (actualText === expected) {
                return {
                    pass: true,
                    message: () => `Expected ${received} to not have text "${expected}"`,
                };
            } else {
                return {
                    pass: false,
                    message: () => `Expected ${received} to have text "${expected}", but got "${actualText}"`,
                };
            }
        },
    });
}

const verifyHeadings = async (page: Page): Promise<string> => {
    const heading = await page.$('h1.heading');
    const headingText = await heading.textContent();
    expect(headingText).to.equal("Welcome to the-internet");
    return headingText;
}

const getAllWorkingLinks = async (page: Page): Promise<string[]> => {
    // all href links
    const allLinks = await page.$$("a[href]");

    // all href attributes
    const hrefValues = await Promise.all(
        allLinks.map(async (linkElement) => {
            const linkTxt = await linkElement.getAttribute('href');
            return linkTxt;
        })
    );

    const workingLinks = [];

    for (const linkText of hrefValues) {
        const ctx = await request.newContext();
        let res: APIResponse;
        try {
            res = await ctx.get(linkText);
            const status = res.status();
            if (status === 200) {
                workingLinks.push(linkText);
            }
        }
        catch (e) {
        }
    }
    expect(workingLinks).to.have.length.greaterThan(0);
    console.log(workingLinks);
    return workingLinks;
}

const oneLinkUsingJs = async (page: Page): Promise<string> => {
    const firstLinkUsingJavaScript = await page.$eval('a[href]', (el) => el.getAttribute('href'));
    expect(firstLinkUsingJavaScript).to.include('http').and.include('.com');
    return firstLinkUsingJavaScript;
}

const allLinkUsingJs = async (page: Page): Promise<string[]> => {
    const allLinkUsingJavaScript = await page.$$eval('a[href]', (el) => el.map((e) => e.getAttribute('href')));
    expect(allLinkUsingJavaScript).to.have.length.greaterThan(0);
    return allLinkUsingJavaScript;
}

const goIbiboLocatorHandler = async (page: Page) => {
    page.setDefaultNavigationTimeout(30000);

    await page.addLocatorHandler(page.locator("p[data-id='terms-condition']"), async (locator) => {
        console.log(`------ terms and condition popup is visible. ------`);
        await page.locator("span.logSprite.icClose").click();
        console.log(`------ terms and condition popup is closed. ------`);
    });

    await page.goto("https://goibibo.in/", {
        waitUntil: "networkidle", timeout: 0
    });

    await page.locator("//span[text()='From']//following-sibling::p[text()='Enter city or airport']").click();
    await page.locator("//span[text()='From']//following-sibling::input").fill("Delhi");
    await page.locator("ul#autoSuggest-list li").nth(Math.floor(Math.random() * 10)).click();

    await page.locator("//span[text()='To']//following-sibling::input").fill("Mumbai");
    await page.locator("ul#autoSuggest-list li").nth(Math.floor(Math.random() * 10)).click();

    await page.locator("//span[text()='Departure']//following-sibling::p").first().click();
    await page.locator("div[aria-label='Wed Jul 31 2024']").click();

    await page.locator("//span[text()='SEARCH FLIGHTS']").click();
    await page.locator("//button[text()='VIEW FARES']").first().waitFor({ state: 'visible', timeout: 30000 });

    expect(await page.locator("//button[text()='VIEW FARES']").first().isVisible()).to.be.true;
}

const switchWindow = async (page: Page) => {
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.evaluate(() => window.open('https://google.co.in'))
    ]);

    if (popup) {
        await popup.bringToFront();
        expect(await popup.title()).to.contain("Google");
    }
    else {
        expect.fail(`-------- No popup found --------`);
    }
}

const fn = async () => {
    const browser = await chromium.launch({
        channel: 'chromium',
        headless: false,
        // args: ['--start-maximized', '--window-size=1920,1080', '--window-position=-5,-5'],
        downloadsPath: resolve('./downloads'),
        // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        timeout: 0,
        tracesDir: resolve('./output')
    });

    const ctx = await browser.newContext({
        acceptDownloads: true,
        baseURL: "https://the-internet.herokuapp.com/",
        colorScheme: 'dark',
        javaScriptEnabled: true,
        locale: 'en-EN',
        recordVideo: { dir: './output/' },
        // screen: { height: 1080, width: 1920 },
        // viewport: { height: 1080, width: 1920 },
        serviceWorkers: 'block',
        offline: false,
        recordHar: { mode: 'full', content: "embed", path: `./output/HAR_${Date.now()}.zip` },
        // reducedMotion: 'reduce',
        // proxy: { server: "http://127.0.0.1:8080", username: "username", password: "password" },
        timezoneId: 'America/New_York',
        permissions: ['geolocation'],
    });

    const page = await ctx.newPage();
    await ctx.tracing.start({ screenshots: true, snapshots: true, sources: true });

    page.setDefaultTimeout(10000);
    await page.goto("/");

    // await verifyHeadings(page);
    // await getAllWorkingLinks(page);
    // await oneLinkUsingJs(page);
    // await allLinkUsingJs(page);
    // pageCloseListener(page);
    // dialogListener(page);
    // await goIbiboLocatorHandler(page);

    // await page.addInitScript({path: resolve('./src/standalone/preload.js')}); // Failed to understand it.
    // await page.goto('data:text/html,<script>throw new Error("Test")</script>');

    // await page.click("a[href='/checkboxes']", { button: "right" })
    // await page.keyboard.press("ArrowDown");

    // await page.keyboard.down("ArrowDown");
    // await page.keyboard.up("ArrowDown");

    // await page.keyboard.press("Enter");

    await page.waitForFunction(() => document.readyState === "complete");
    await page.video().saveAs('./output/video.mp4');
    await page.route('**/*', (route, req) => {
        route.fulfill();
        route.abort();

        const headers = {
            ...req.headers(),
            foo: 'foo-value', // set "foo" header
            bar: undefined, // remove "bar" header
          };
          route.continue({ headers });
    });

    await ctx.tracing.stop({ path: `./output/tracing_${Date.now()}.zip` });
    await page.close();
    await browser.close();
}

fn()
    .then()
    .catch((e) => {
        console.error(e);
        process.exit(0);
    });