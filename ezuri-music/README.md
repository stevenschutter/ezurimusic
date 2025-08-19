# Ezuri Music — Neon 80s DJ Concept

Static, responsive website for Steven's Ezuri Music: Afro/Progressive House with strong 80s influences. Includes animated background, concept section, short audio snippets, Top 3 releases, and easy contact/social links.

## Quick start

Open `index.html` directly in your browser, or serve the folder:

```bash
python3 -m http.server 8080 --directory /workspace/ezuri-music
```

Then visit `http://localhost:8080`.

## Customize

- Background video: replace `assets/video/background.mp4` and `assets/images/poster.jpg`.
- Config file: edit `config.json` to set social links, Top 3, and the contact endpoint.
- Contact form: if not using `config.json`, you can still set the `action` URL in the form directly in `index.html`.

## Assets licensing

Use your own licensed media. The audio URLs are public demo links and should be replaced for production.

## Add the Pexels background video

1) Download the video from the Pexels page and save it as `assets/video/background.mp4`.

2) Optional: create a poster image at `assets/images/poster.jpg`.
   - If you have ffmpeg: `ffmpeg -y -ss 00:00:01 -i assets/video/background.mp4 -frames:v 1 assets/images/poster.jpg`
   - Or export a still image from your video editor.


