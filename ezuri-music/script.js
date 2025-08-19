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

  // Top 3 list — default configuration (can be overridden by config.json)
  let top3 = [
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

  function renderTop3() {
    const list = document.getElementById('top3-list');
    if (!list) return;
    list.innerHTML = '';
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

  // Social links — defaults (can be overridden by config.json)
  let socials = {
    instagram: 'https://instagram.com/',
    soundcloud: 'https://soundcloud.com/',
    youtube: 'https://youtube.com/@',
    mixcloud: 'https://mixcloud.com/',
    tiktok: 'https://tiktok.com/@'
  };
  function applySocials() {
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
  }

  function updateContactForm(endpoint) {
    if (!endpoint) return;
    const form = document.getElementById('contact-form');
    if (form) form.setAttribute('action', endpoint);
  }

  // Load optional config.json to override defaults
  fetch('config.json', { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('No config');
      return res.json();
    })
    .then((cfg) => {
      if (Array.isArray(cfg.top3)) top3 = cfg.top3;
      if (cfg.socials && typeof cfg.socials === 'object') socials = { ...socials, ...cfg.socials };
      if (cfg.contactEndpoint) updateContactForm(cfg.contactEndpoint);
    })
    .catch(() => {})
    .finally(() => {
      renderTop3();
      applySocials();
    });

  // Initial render with defaults in case config.json is missing
  renderTop3();
  applySocials();

  // Background video fallback control
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.addEventListener('error', () => {
      // Hide video on error; background will rely on overlay gradient
      bgVideo.style.display = 'none';
    }, true);
  }
});

