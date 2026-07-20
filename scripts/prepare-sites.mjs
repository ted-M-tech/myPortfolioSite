import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const server = new URL("../dist/server/", import.meta.url);

await mkdir(client, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === "client" || entry.name === "server") continue;
  await cp(
    new URL(entry.name, dist),
    new URL(entry.name, client),
    { recursive: true, force: true },
  );
}

await mkdir(server, { recursive: true });
await writeFile(
  new URL("index.js", server),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (url.pathname.includes(".")) return response;

    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`,
  "utf8",
);

const files = await readdir(client);
if (!files.includes("index.html")) {
  throw new Error(`Sites client staging is incomplete: ${join("dist", "client", "index.html")} is missing`);
}
