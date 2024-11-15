import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process";
import iCloud from "icloudjs";

const rl = readline.createInterface({input: stdin, output: stdout});

const icloud = new iCloud({
  username: await rl.question("username: "),
  password: await rl.question("password: "),
  trustDevice: true,
  authMethod: "srp",
});

await icloud.authenticate();

console.log(icloud.status);
if (icloud.status === "MfaRequested") {
  await icloud.provideMfaCode(await rl.question("mfa code:"));
}
await icloud.awaitReady;
