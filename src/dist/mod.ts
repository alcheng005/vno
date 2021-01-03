import Initialize from "../strategies/initialize.ts";
import Creator from "../command-line/creator.ts";

import { fs, path } from "../lib/deps.ts";

const read = { name: "read" } as const;
const write = { name: "write" } as const;
const run = { name: "run" } as const;

const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);
const resRun = await Deno.permissions.request(run);

const arg = Deno.args[0];
const entry = Deno.args[1] || ".";

if (resRead && resRun && resWrite) {
  if ((/create/i).test(arg)) {
    const repo = Deno.args[1];

    if (repo) {
      await fs.ensureDir(`${Deno.cwd()}/${repo}`);
      Deno.chdir(`${Deno.cwd()}/${repo}`);
      await Creator(repo);
    }
  }
  if ((/build/i).test(arg)) {
    let config;

    for await (const file of fs.walk(entry)) {
      const currFile = path.parse(file.path);
      if (currFile.name === "vno.config") {
        config = currFile;
      }
    }

    if (config) {
      const runSubProcess = Deno.run({
        cmd: [
          "deno",
          "run",
          "--unstable",
          "--allow-read",
          "--allow-write",
          "--allow-run",
          `${config.base}`,
        ],
      });
      const { code } = await runSubProcess.status();
      Deno.exit(code);
    }
  }
}

export default new (Initialize as any)();
