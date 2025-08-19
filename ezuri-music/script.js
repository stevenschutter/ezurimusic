document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('show');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Limit audio to preview seconds, pause others when one plays
  const snippets = Array.from(document.querySelectorAll('audio.audio-snippet'));
  let currentPlaying = null;
  snippets.forEach((audio) => {
    audio.addEventListener('play', () => {
      if (currentPlaying && currentPlaying !== audio) {
        currentPlaying.pause();
        currentPlaying.currentTime = 0;
      }
      currentPlaying = audio;
    });

    const previewSecondsAttr = audio.getAttribute('data-preview-seconds');
    const previewSeconds = previewSecondsAttr ? Number(previewSecondsAttr) : 20;
    let startedAt = 0;
    audio.addEventListener('play', () => { startedAt = audio.currentTime; });
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime - startedAt >= previewSeconds) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  });

  // Top 3 list — editable configuration
  const top3 = [
    {
      title: 'Artbat & AnotherLife — In Your Arms',
      label: 'UPPERGROUND',
      url: 'https://open.spotify.com/track/4Wivf27l4oPpHjVw7C2n3N'
    },
    {
      title: 'Keinemusik, Rampa & Chuala — Love Is Free',
      label: 'Keinemusik',
      url: 'https://open.spotify.com/track/0cF1tS2n9U9dH3g1B8J5oQ'
    },
    {
      title: 'Anyma — Pictures Of You (ft. Camila Cabello)',
      label: 'Afterlife',
      url: 'https://open.spotify.com/track/7pn9TzJm5sJ2EUZp8h2x4a'
    }
  ];

  const list = document.getElementById('top3-list');
  if (list) {
    top3.slice(0, 3).forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="track"><span class="badge">${idx + 1}</span><div>
          <div><strong>${item.title}</strong></div>
          <div class="note">${item.label}</div>
        </div></div>
        <div class="top3-cta"><a href="${item.url}" target="_blank" rel="noopener">Listen</a></div>
      `;
      list.appendChild(li);
    });
  }

  // Social links — edit here
  const socials = {
    instagram: 'https://instagram.com/',
    soundcloud: 'https://soundcloud.com/',
    youtube: 'https://youtube.com/@',
    mixcloud: 'https://mixcloud.com/',
    tiktok: 'https://tiktok.com/@'
  };
  const socialMap = [
    ['social-instagram', 'instagram'],
    ['social-soundcloud', 'soundcloud'],
    ['social-youtube', 'youtube'],
    ['social-mixcloud', 'mixcloud'],
    ['social-tiktok', 'tiktok']
  ];
  socialMap.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && socials[key]) el.setAttribute('href', socials[key]);
  });

  // Background video fallback control
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.addEventListener('error', () => {
      // Hide video on error; background will rely on overlay gradient
      bgVideo.style.display = 'none';
    }, true);
  }
});

