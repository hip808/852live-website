# 852 Live website

Plain static site: no build step, no dependencies.

## Add a new show
Open `js/shows.js`, copy one block inside `SHOWS`, change the fields and save. Put the poster in `img/`.
- A show dated today or later becomes the **Next show** in the hero and appears under Shows. Past ones move down by themselves.
- Paste the ticket link in `ticketUrl` to get a **Tickets** button (`null` hides it).
- `image: null` shows a styled text card instead of a poster.

## Edit text
All page text (English and 中文) is in `js/i18n.js`. Contact details: search for `info@852live.net` in `index.html` and `js/main.js`.

## Preview on your computer
Modules need a web server, so double-clicking `index.html` will not work:

```bash
python3 -m http.server 8852
```
then open http://127.0.0.1:8852

## Publish for free
Live at https://852live.net (Cloudflare Pages, auto-deploys from GitHub repo `hip808/852live-website`, branch `main`, no build command, output folder `/`).
852live.co.uk redirects to 852live.net (Cloudflare Redirect Rule). Email: Cloudflare Email Routing on 852live.net.

## Services
- Mailing list: Buttondown (username `852live`); the form in `index.html` posts to it. Sending domain: `news.852live.net`.
- Privacy page: `privacy.html` (English, 简体, 繁體). Update it if you add analytics, ticketing or other data collection.

## Still to do
- Frankie's address (`frankie@852live.net`) in Cloudflare Email Routing; set the catch-all if wanted.

## Tests
```bash
npm test
```
