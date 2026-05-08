/* ================================================
   NOOR AL-ISLAM — Islamic Video Website
   script.js — Vanilla JavaScript
   ================================================ */

/* ================================================
   1. VIDEO DATA
   Each video has: id, title, sheikh, category,
   duration, description, youtubeId (for embed),
   and thumbnail (YouTube auto-thumbnail).
   ================================================ */
const videos = [
  {
    id: 1,
    title: "تفسير سورة الفاتحة — الدرس الأول",
    sheikh: "الشيخ سعد الغامدي",
    category: "تفسير",
    duration: "45:12",
    description: "شرح مفصّل لسورة الفاتحة وفضلها وتفسير آياتها الكريمة مع بيان المعاني والأسرار القرآنية.",
    youtubeId: "ZmPJ0CAobx4",
  },
  {
    id: 2,
    title: "تلاوة خاشعة لسورة البقرة",
    sheikh: "الشيخ عبدالرحمن السديس",
    category: "تلاوة",
    duration: "1:20:33",
    description: "تلاوة قرآنية خاشعة من الحرم المكي لسورة البقرة بصوت الشيخ عبدالرحمن السديس.",
    youtubeId: "HVLYP1BXGWU",
  },
  {
    id: 3,
    title: "محاضرة: الإيمان بالله وأثره في حياة المسلم",
    sheikh: "الشيخ خالد الراشد",
    category: "محاضرة",
    duration: "58:07",
    description: "محاضرة قيّمة تتناول مفهوم الإيمان بالله تعالى وكيف يؤثر ذلك إيجابياً في حياة المسلم اليومية.",
    youtubeId: "9G_DJzLrRCw",
  },
  {
    id: 4,
    title: "دروس في أصول الفقه — الدرس الأول",
    sheikh: "الشيخ ابن عثيمين",
    category: "فقه",
    duration: "1:02:45",
    description: "سلسلة علمية في أصول الفقه الإسلامي للشيخ ابن عثيمين رحمه الله، تغطي المقدمات والأسس الفقهية.",
    youtubeId: "HVlN4SFlWbU",
  },
  {
    id: 5,
    title: "قصة سيدنا موسى عليه السلام",
    sheikh: "الشيخ نبيل العوضي",
    category: "قصص الأنبياء",
    duration: "1:15:20",
    description: "قصة نبي الله موسى عليه السلام كاملة من مولده حتى وفاته مع استخلاص الدروس والعبر.",
    youtubeId: "B7tL4Akmdes",
  },
  {
    id: 6,
    title: "تلاوة سورة الكهف — ليلة الجمعة",
    sheikh: "الشيخ ماهر المعيقلي",
    category: "تلاوة",
    duration: "38:54",
    description: "تلاوة نورانية لسورة الكهف الكريمة بصوت الشيخ ماهر المعيقلي، يُستحسن الاستماع إليها يوم الجمعة.",
    youtubeId: "pO4eoMiW3V8",
  },
  {
    id: 7,
    title: "كيف تحفظ القرآن الكريم؟ — خطوات عملية",
    sheikh: "الشيخ مصطفى حسني",
    category: "تعليم",
    duration: "27:33",
    description: "خطوات عملية ومجرّبة لحفظ القرآن الكريم بسهولة مع تقديم جدول يومي منظّم للحفّاظ.",
    youtubeId: "oF-JGsS4wA0",
  },
  {
    id: 8,
    title: "شرح الأربعين النووية — الحديث الأول",
    sheikh: "الشيخ صالح المنجد",
    category: "حديث",
    duration: "50:18",
    description: "شرح حديث الأعمال بالنيات من كتاب الأربعين النووية مع بيان الفوائد والأحكام الفقهية.",
    youtubeId: "2eGg_xaGO7I",
  },
];

/* ================================================
   2. STATE — track which video is currently active
   ================================================ */
let currentVideoId = null;    // id of the playing video
let filteredVideos = [...videos]; // holds search results

/* ================================================
   3. DOM REFERENCES
   ================================================ */
const playlist        = document.getElementById('playlist');
const cardsGrid       = document.getElementById('cardsGrid');
const videoPlayer     = document.getElementById('videoPlayer');
const videoTitle      = document.getElementById('videoTitle');
const sheikhName      = document.getElementById('sheikhName');
const videoDuration   = document.getElementById('videoDuration');
const videoDesc       = document.getElementById('videoDesc');
const loadingOverlay  = document.getElementById('loadingOverlay');
const searchInput     = document.getElementById('searchInput');
const hamburgerBtn    = document.getElementById('hamburgerBtn');
const mainNav         = document.getElementById('mainNav');

/* ================================================
   4. RENDER PLAYLIST (sidebar)
   ================================================ */
function renderPlaylist(list) {
  playlist.innerHTML = ''; // clear

  list.forEach(video => {
    const li = document.createElement('li');
    li.className = 'playlist-item' + (video.id === currentVideoId ? ' active' : '');
    li.dataset.id = video.id;

    // YouTube auto-generated thumbnail
    const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

    li.innerHTML = `
      <img class="playlist-thumb" src="${thumbUrl}" alt="${video.title}" loading="lazy" />
      <div class="playlist-info">
        <div class="playlist-title">${video.title}</div>
        <div class="playlist-meta">${video.sheikh} · ${video.duration}</div>
      </div>
      <span class="playing-badge">▶</span>
    `;

    // Click: play this video
    li.addEventListener('click', () => playVideo(video.id));
    playlist.appendChild(li);
  });
}

/* ================================================
   5. RENDER VIDEO CARDS (main grid)
   ================================================ */
function renderCards(list) {
  cardsGrid.innerHTML = ''; // clear

  // Show "no results" message if empty
  if (list.length === 0) {
    cardsGrid.innerHTML = '<div class="no-results">🔍 لا توجد نتائج مطابقة للبحث</div>';
    return;
  }

  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card' + (video.id === currentVideoId ? ' active' : '');
    card.dataset.id = video.id;

    const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

    card.innerHTML = `
      <div class="card-thumb-wrap">
        <img src="${thumbUrl}" alt="${video.title}" loading="lazy" />
        <div class="play-overlay">
          <div class="play-btn-icon">▶</div>
        </div>
        <span class="duration-badge">${video.duration}</span>
      </div>
      <div class="card-info">
        <div class="card-title">${video.title}</div>
        <div class="card-sheikh">${video.sheikh}</div>
        <span class="card-tag">${video.category}</span>
      </div>
    `;

    card.addEventListener('click', () => playVideo(video.id));
    cardsGrid.appendChild(card);
  });
}

/* ================================================
   6. PLAY VIDEO — update player + UI
   ================================================ */
function playVideo(id) {
  const video = videos.find(v => v.id === id);
  if (!video) return;

  currentVideoId = id;

  /* — Show loading overlay — */
  loadingOverlay.classList.remove('hidden');

  /* — Update iframe src — */
  // autoplay=1 starts it immediately; rel=0 hides related videos
  videoPlayer.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  /* — Update video info panel — */
  videoTitle.textContent    = video.title;
  sheikhName.textContent    = video.sheikh;
  videoDuration.textContent = video.duration;
  videoDesc.textContent     = video.description;

  /* — Hide loading overlay once iframe loads — */
  videoPlayer.onload = () => {
    // Short delay for smoother fade
    setTimeout(() => loadingOverlay.classList.add('hidden'), 400);
  };

  /* — Highlight active state in playlist — */
  document.querySelectorAll('.playlist-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.id) === id);
  });

  /* — Highlight active state in cards — */
  document.querySelectorAll('.video-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.id) === id);
  });

  /* — Scroll playlist item into view — */
  const activeItem = playlist.querySelector('.playlist-item.active');
  if (activeItem) {
    activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* — Scroll to top of page on mobile (optional UX) — */
  if (window.innerWidth <= 768) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ================================================
   7. SEARCH FUNCTIONALITY
   ================================================ */
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === '') {
    // Reset: show all videos
    filteredVideos = [...videos];
  } else {
    filteredVideos = videos.filter(v =>
      v.title.toLowerCase().includes(query)   ||
      v.sheikh.toLowerCase().includes(query)  ||
      v.category.toLowerCase().includes(query)
    );
  }

  renderCards(filteredVideos);
  renderPlaylist(filteredVideos);
}

/* Listen for input changes (live search) */
searchInput.addEventListener('input', handleSearch);

/* Also search on button click */
document.querySelector('.search-btn').addEventListener('click', handleSearch);

/* Search on Enter key */
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

/* ================================================
   8. HAMBURGER MENU (mobile nav toggle)
   ================================================ */
hamburgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

/* Close nav when a link is clicked */
mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ================================================
   9. NAV LINK ACTIVE STATE
   ================================================ */
mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    mainNav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ================================================
   10. INITIALISE — render everything on page load
   ================================================ */
function init() {
  renderPlaylist(videos);  // fill sidebar
  renderCards(videos);     // fill card grid

  // Auto-play the first video
  playVideo(videos[0].id);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
