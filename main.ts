// gta6-meme-x-01 entrypoint (Node 22, standard library only).
//
// The entry itself is an X post: a GTA 6 meme whose first picture and text the
// house reads from X and hands to the judge. This program's only job is to hand
// the post's address over: it reads POST.json from the repository root and
// writes an identical copy into the output directory, where the gate picks it
// up. Nothing this program writes is judged.
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function botDir(): string {
  return process.env.MAKEFUN_BOT_DIR ?? '/bot';
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function main(): void {
  const source = join(botDir(), 'POST.json');
  const target = join(outputDir(), 'POST.json');
  mkdirSync(outputDir(), { recursive: true });
  let payload: Buffer;
  try {
    payload = readFileSync(source);
  } catch (err) {
    console.error(`could not read ${source}: ${(err as Error).message}`);
    process.exit(1);
  }
  // Guard: the gate reads POST.json as a JSON object naming a post URL, so
  // refuse to hand over a payload that is not even valid JSON.
  let parsed: unknown;
  try {
    parsed = JSON.parse(payload.toString('utf8'));
  } catch {
    console.error(`${source} is not valid JSON`);
    process.exit(1);
  }
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    console.error(`${source} must be a JSON object with a "url" string`);
    process.exit(1);
  }
  try {
    writeFileSync(target, payload);
  } catch (err) {
    console.error(`could not write ${target}: ${(err as Error).message}`);
    process.exit(1);
  }
  console.log(`POST.json copied to ${target}`);
}

main();
