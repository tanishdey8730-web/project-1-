# Sharda Setu

Accessible learning platform with a dedicated **Online Education** module powered by curated YouTube lessons for competitive exams.

## Features

- Live classes, notes sharing, offline access, chat & polls (static pages).
- **Online Education** section (new) with:
  - A YouTube icon entry in the home page Features grid and Features page.
  - 10 competitive preparation exam tracks:
    `SSC`, `SSC CGL`, `SSC CHSL`, `SSC MTS`, `SSC GD`,
    `CDS`, `AFCAT`, `NDA`, `CAPF AC`, `RRB NTPC`.
  - Subject-wise videos for **Maths, Physics, Chemistry**.
  - YouTube **playlists** per exam, embedded inline.
- Small Node/Express backend that serves the course data via a JSON API
  and also serves the static frontend.

## Quick start

```bash
npm install
npm start
```

Open <http://localhost:3000/online-education.html> (or `index.html`).

If you don't want to run the backend, you can still open the HTML files
directly — the page falls back to `backend/data/education-fallback.js`.

## API

| Method | Path                                  | Description                          |
| ------ | ------------------------------------- | ------------------------------------ |
| GET    | `/api/health`                         | Health check                         |
| GET    | `/api/online-education`               | Full education payload               |
| GET    | `/api/online-education/exams`         | Just the list of competitive exams   |
| GET    | `/api/online-education/exams/:id`     | Detail for a specific exam           |
| GET    | `/api/online-education/subjects`      | Subjects and cross-subject playlists |

Exam ids: `ssc`, `ssc-cgl`, `ssc-chsl`, `ssc-mts`, `ssc-gd`,
`cds`, `afcat`, `nda`, `capf`, `rrb-ntpc`.

## File layout

```
.
├── index.html / about.html / features.html / login.html / signup.html
├── online-education.html      (new — exam tracks & videos)
├── online-education.css
├── online-education.js
├── style.css / features.css / about.css / login.css / signup.css
├── backend/
│   ├── server.js              (Express API + static server)
│   └── data/
│       ├── education.json     (source of truth)
│       └── education-fallback.js  (offline copy for file:// opens)
└── package.json
```

## Editing the catalog

Edit `backend/data/education.json` to add/replace videos and playlists.
Restart the server to pick up changes. If you also want the page to work
without the backend, mirror your edits into
`backend/data/education-fallback.js`.
