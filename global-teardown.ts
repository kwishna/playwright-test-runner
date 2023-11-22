import { promisify } from "util";
const sleep = promisify(setTimeout);

async function tearDown() {
    console.log("tear-down")
}
export default tearDown;
