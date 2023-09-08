const { promisify } = require("util");
const sleep = promisify(setTimeout);

async function globalSetup() {
    console.log("set-up")
}
export default globalSetup;
