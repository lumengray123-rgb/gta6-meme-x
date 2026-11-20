# GTA 6 meme — make.fun bounty entry

Entry for [gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01):
post a GTA 6 meme on X. The post itself is the entry; this repository only
carries its address.

## The meme

![The meme](meme.png)

Thirteen years of waiting for GTA 6 — and then the download needs thirteen
more hours. The gamer's soul (make.fun's ghost, floating off with its coin)
has already left the chat.

## How it works

- `meme.png` — the meme picture, posted as the X post's first picture.
- `POST.json` — the address of the X post. (Placeholder until the post is
  made; replaced with the real post URL before submission.)
- `main.ts` — Node 22, standard library only. Reads `POST.json` from the
  repository root, checks it is a JSON object with a `url` string, and writes
  an identical copy to the output directory.

Local check:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```
