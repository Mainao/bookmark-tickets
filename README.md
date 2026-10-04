# 🎟️ Bookmark Tickets

A Chrome extension that shows your bookmarks as a gallery of archival ticket cards. Each card has a preview image, a ticket number, a bold title, a perforated divider and a short description of the page.

> **Status:** early development. The build setup is in place, and the gallery UI is being built. See the [roadmap](#roadmap) for what's done and what's coming.

## How it works

Click the extension icon in the Chrome toolbar and your bookmarks open in a full-page gallery in a new tab. Every bookmark becomes a card:

- **Image:** the page's preview image (`og:image`). If a page has none, a generated poster with the site's favicon is shown instead.
- **NO 001:** a stable ticket number, based on when you saved the bookmark (oldest first).
- **Title:** the bookmark title, which you can override with your own.
- **Description:** the page's description, or your own note.

Your bookmark folders become tabs in the header, so you can browse one collection at a time.

## Tech stack

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev) for bundling
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [shadcn/ui](https://ui.shadcn.com) components
- [Framer Motion](https://motion.dev) for animation
- Chrome Extension **Manifest V3**

## Requirements

- **Node.js 22.13+ or 24 LTS** (odd-numbered releases such as Node 23 are not supported by some dependencies)
- npm 10+
- Google Chrome (or another Chromium browser that supports Manifest V3)

## Getting started

```bash
git clone https://github.com/Mainao/bookmark-tickets.git
cd bookmark-tickets
npm install
npm run build
```

### Load the extension in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `build/` folder.
4. Click the Bookmark Tickets icon in the toolbar. The gallery opens in a new tab.

### Development workflow

Extension pages don't hot-reload, so the simplest loop is:

```bash
npm run watch
```

This rebuilds `build/` every time you save. After a rebuild, click the **reload** icon on the extension card in `chrome://extensions`, then close and reopen the gallery tab.

`npm run dev` starts the Vite dev server in a normal browser tab. That's handy for working on layout and styling, but `chrome.*` APIs aren't available there, so bookmark data won't load.

## Scripts

| Script            | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run build`   | Type-checks and builds the extension into `build/`   |
| `npm run watch`   | Rebuilds on every file change                        |
| `npm run dev`     | Starts the Vite dev server (UI only, no Chrome APIs) |
| `npm run lint`    | Runs ESLint                                          |
| `npm run preview` | Serves the production build locally                  |

## Project structure

```
bookmark-tickets/
├── index.html               # gallery page
├── public/
│   └── manifest.json        # extension manifest (copied into build/)
├── src/
│   ├── main.tsx             # entry for the gallery page
│   ├── App.tsx              # page shell
│   ├── background/
│   │   └── index.ts         # service worker: opens the gallery tab
│   ├── features/            # one folder per feature (bookmarks, tickets, metadata, …)
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts         # shared helpers
│   └── styles/
│       └── index.css        # Tailwind import, theme tokens, custom utilities
├── eslint.config.js
├── vite.config.ts
└── package.json
```

Features live in `src/features/`, each with its own components, hooks and logic, and a single `index.ts` that exports what other code needs. Shared, feature-agnostic code lives in `components/`, `lib/` and `styles/`.

## Permissions

| Permission                    | Why it's needed                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `bookmarks`                   | Read your bookmarks to show them as cards, and edit or delete them from the gallery                                                            |
| `storage`, `unlimitedStorage` | Cache preview images and descriptions on your device                                                                                           |
| `favicon`                     | Show site icons on cards without a preview image                                                                                               |
| `activeTab`, `scripting`      | Read the preview details of the page you're on when you save it                                                                                |
| `contextMenus`                | Add a "Save to Bookmark Tickets" option to the right-click menu                                                                                |
| `<all_urls>` _(optional)_     | Fetch preview images and descriptions for your bookmarked pages. Only requested when you turn on rich previews, and can be revoked at any time |

## Privacy

Bookmark Tickets has no server and no analytics. Your bookmarks, notes and cached previews stay in your browser. The only network requests it makes are to the pages you've bookmarked, to fetch their preview details, and only after you enable rich previews.

## Credits

Built on top of [chrome-extension-vite-shadcn-framer](https://github.com/tooniez/chrome-extension-vite-shadcn-framer) by tooniez.
