import { request } from '@playwright/test';

const REPO = 'tweetcrafter';
const USER = 'curiousily';

(async () => {
    //
    // const requestContext = await request.newContext({
    //     httpCredentials: {
    //       username: 'user',
    //       password: 'passwd'
    //     }
    //   });
    //   await requestContext.get(`https://api.example.com/login`);
    //   // Save storage state into the file.
    //   await requestContext.storageState({ path: 'state.json' });

    //   // Create a new context with the saved storage state.
    //   const context = await browser.newContext({ storageState: 'state.json' });
    //
    // -------------------------------------------------------------------------------
    //
    // Create a context that will issue http requests.
    const context = await request.newContext({
        baseURL: 'https://api.github.com',
    });

    // Create a repository.
    await context.post('/user/repos', {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Add GitHub personal access token.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
        data: {
            name: REPO
        }
    });

    // Delete a repository.
    await context.delete(`/repos/${USER}/${REPO}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Add GitHub personal access token.
            'Authorization': `token ${process.env.API_TOKEN}`,
        }
    });
})();