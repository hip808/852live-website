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

## Still to do
- Mailing list: the sign-up box is a disabled placeholder. Pick a service (Buttondown, Mailchimp, etc.) and replace the form in `index.html`.

## Tests
```bash
npm test
```
