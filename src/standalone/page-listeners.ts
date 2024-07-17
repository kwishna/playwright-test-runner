import { Page } from "@playwright/test";

export function consoleListener(page: Page) {
    page.on('console', (msg) => {
        console.log(msg.text());
    });
}

export function pageCloseListener(page: Page) {
    page.on('close', (page) => {
        console.log(`------ ${page.url()} page is getting closed ------`);
    });
}

export function pageCrashedListener(page: Page) {
    page.on('crash', (page) => {
        console.log(`------ ${page.url()} has crashed ------`);
    });
}

export function dialogListener(page: Page) {
    page.on('dialog', (dia) => {

        const dialogType = dia.type();

        switch (dialogType) {
            case 'prompt':
                console.log(`------ prompt box appears: ${dia?.message()} | default value: ${dia?.defaultValue()}-------`);
                dia.accept().then(() => console.log(`accepted`)).catch(() => console.log(`accept failed`));
                break;

            case 'alert':
                console.log(`------ alert box appears: ${dia?.message()} | default value: ${dia?.defaultValue()}------`);
                dia.dismiss().then(() => console.log(`dismissed`)).catch(() => console.log(`dismiss failed`));
                break;

            case 'confirm':
                console.log(`------ confirm box appears: ${dia?.message()} | default value: ${dia?.defaultValue()} ------`);
                dia.accept().then(() => console.log(`confirmation accepted`)).catch(() => console.log(`confirmation failed`));
                break;

            case 'beforeunload':
                console.log(`------ before unload appears: ${dia?.message()} | default value: ${dia?.defaultValue()} ------`);
                dia.accept().then(() => console.log(`before unload accepted`)).catch(() => console.log(`before unload failed`));
                break;

            default:
                console.log(`------ unexpected dialog appears ------`);
        }
    });
}

export function registerPageError(page: Page) {
    page.on('pageerror', exception => {
        console.log(`Uncaught exception: "${exception}"`);
    });
}