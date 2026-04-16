/**
 * TBL COMPONENTS — tự động inject nav + footer + series stats
 * =============================================================
 * Include file này vào cuối <body> của mọi trang.
 * Không cần chỉnh file này khi thêm bài — chỉ cần chỉnh site-data.js
 */

(function () {

  // ─── XÁC ĐỊNH PATH GỐC ────────────────────────────────────
  // Tự tính xem trang hiện tại đang ở thư mục nào
  const path = window.location.pathname;
  const isRoot = !path.includes('/articles/') && !path.includes('/series/');
  const isArticle = path.includes('/articles/');
  const isSeries = path.includes('/series/');
  const root = isRoot ? '' : '../';

  // ─── HELPER: tìm series data theo code ──────────────────────
  function getSeries(code) {
    return TBL.series.find(s => s.code === code);
  }

  // ─── ĐẾM SỐ BÀI ĐÃ PUBLISHED THEO SERIES ──────────────────
  function countPublished(seriesCode) {
    return TBL.articles.filter(a => a.series === seriesCode && a.published).length;
  }

  function countTotal(seriesCode) {
    return TBL.articles.filter(a => a.series === seriesCode).length;
  }

  // ─── INJECT NAV ─────────────────────────────────────────────
  function injectNav() {
    const nav = document.getElementById('tbl-nav');
    if (!nav) return;
    nav.innerHTML = `
      <div class="nav-inner">
        <a class="wordmark" href="${root}index.html">
          The Becoming Learners
          <span style="color:var(--orange)">·</span>
          <span style="font-size:13px;color:#7A7872;font-family:'DM Sans',sans-serif;font-weight:300">by Vy Phan</span>
        </a>
        <ul class="nav-links">
          <li><a href="${root}index.html#articles">Articles</a></li>
          <li><a href="${root}series/index.html">Series</a></li>
          <li><a href="${root}podcast.html">Podcast</a></li>
          <li><a href="${root}index.html#events">Events</a></li>
          <li><a href="${TBL.brand.portfolio}" target="_blank">Portfolio ↗</a></li>
        </ul>
      </div>`;
  }

  // ─── INJECT FOOTER ──────────────────────────────────────────
  function injectFooter() {
    const footer = document.getElementById('tbl-footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-inner" style="max-width:1100px;margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div style="font-size:13px;color:var(--ink-muted)">
          <strong style="color:var(--ink)">${TBL.brand.name}</strong> · by Vy Phan
        </div>
        <div style="display:flex;gap:20px">
          <a href="${root}index.html" style="font-size:12px;color:var(--ink-faint);text-decoration:none">← Home</a>
          <a href="${TBL.brand.youtube}" target="_blank" style="font-size:12px;color:var(--ink-faint);text-decoration:none">YouTube</a>
          <a href="${TBL.brand.linkedin}" target="_blank" style="font-size:12px;color:var(--ink-faint);text-decoration:none">LinkedIn</a>
          <a href="${root}kh/index.html" style="font-size:12px;color:var(--teal,#1A5C5C);text-decoration:none;font-weight:500">Knowledge Horizon →</a>
        </div>
      </div>`;
  }

  // ─── CẬP NHẬT SỐ PUBLISHED TRONG SERIES PAGES ──────────────
  // Tìm tất cả element có data-series-code và tự điền số đúng
  function updateSeriesStats() {
    document.querySelectorAll('[data-series-code]').forEach(el => {
      const code = el.getAttribute('data-series-code');
      const type = el.getAttribute('data-stat');
      if (type === 'published') el.textContent = countPublished(code);
      if (type === 'total') el.textContent = countTotal(code);
    });
  }

  // ─── RENDER ARTICLE FEED (homepage) ─────────────────────────
  // Render N bài mới nhất vào element có id="tbl-article-feed"
  function renderArticleFeed() {
    const feed = document.getElementById('tbl-article-feed');
    if (!feed) return;
    const limit = parseInt(feed.getAttribute('data-limit') || '5');
    const published = TBL.articles.filter(a => a.published).slice(0, limit);

    feed.innerHTML = published.map(a => {
      const s = getSeries(a.series);
      return `
        <a class="article" href="${root}${a.url}"
          style="text-decoration:none;color:inherit;display:grid;grid-template-columns:1fr auto;gap:16px;padding:20px 0;border-bottom:1px solid var(--border-soft)">
          <div>
            <div class="article-meta">
              <span class="thumb-badge" style="font-size:11px;font-weight:500;padding:3px 8px;border-radius:4px;background:${s.bg};color:${s.color}">${a.id}</span>
              <span class="article-date" style="font-size:12px;color:var(--ink-muted)">${a.date}</span>
              <span style="font-size:11px;padding:2px 7px;border:1px solid var(--border);border-radius:3px;color:var(--ink-muted)">${a.lang}</span>
            </div>
            <h2 class="article-title" style="font-family:'Lora',serif;font-size:16px;font-weight:500;margin:6px 0 4px;line-height:1.4">${a.title}</h2>
            <p class="article-excerpt" style="font-size:13px;color:var(--ink-muted);line-height:1.55">${a.excerpt}</p>
          </div>
          <div style="width:80px;height:64px;border-radius:6px;flex-shrink:0;background:${s.gradient};display:flex;align-items:center;justify-content:center">
            <span style="font-size:11px;font-weight:500;color:white;letter-spacing:0.5px">${a.series}</span>
          </div>
        </a>`;
    }).join('');
  }

  // ─── RENDER SERIES CARDS (series/index.html) ────────────────
  function renderSeriesCards() {
    const grid = document.getElementById('tbl-series-grid');
    if (!grid) return;

    grid.innerHTML = TBL.series.map(s => {
      const pub = countPublished(s.code);
      const total = countTotal(s.code);
      const isActive = pub > 0;
      return `
        <div class="series-card ${isActive ? '' : 'series-card--soon'}"
          onclick="location.href='${root}${s.url}'" style="cursor:pointer">
          <div class="card-header">
            <div class="series-icon" style="background:${s.gradient}">
              <span>${s.code}</span>
            </div>
            <div>
              <div class="card-code" style="color:${s.color}">${s.code} · ${s.name.toUpperCase()}</div>
              <h2 class="card-title">${s.fullName}</h2>
            </div>
          </div>
          <p class="card-desc">${s.desc}</p>
          <div class="card-tags">${s.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
          <div class="card-footer">
            <span class="card-eps">
              <strong>${total} episode${total !== 1 ? 's' : ''}</strong> · ${pub > 0 ? pub + ' published' : 'coming soon'}
            </span>
            <a class="card-link" href="${root}${s.url}" style="color:${s.color}">Explore series →</a>
          </div>
        </div>`;
    }).join('');
  }

  // ─── RENDER PODCAST LIST (podcast.html) ─────────────────────
  function renderPodcastList() {
    const list = document.getElementById('tbl-podcast-list');
    if (!list) return;
    const eps = TBL.podcast.filter(e => e.published);

    list.innerHTML = eps.map((ep, i) => `
      <div class="ep-card ${i === 0 ? '' : ''}"
        onclick="window.open('${ep.url}','_blank')"
        style="display:grid;grid-template-columns:52px 1fr auto;gap:16px;padding:20px 0;border-bottom:1px solid var(--border-soft);cursor:pointer">
        <div style="width:44px;height:44px;border-radius:8px;background:${i === 0 ? 'var(--orange)' : 'var(--paper-warm)'};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;color:${i === 0 ? 'white' : 'var(--ink-muted)'};border:1px solid ${i === 0 ? 'var(--orange)' : 'var(--border)'}">
          ${ep.num}
        </div>
        <div>
          <div style="display:flex;gap:8px;margin-bottom:5px">
            <span style="font-size:10px;font-weight:500;padding:2px 8px;border-radius:3px;background:#E6F1FB;color:#185FA5">${ep.lang}</span>
            <span style="font-size:11px;color:var(--ink-faint)">${ep.date}</span>
          </div>
          <div style="font-family:'Lora',serif;font-size:16px;font-weight:500;margin-bottom:5px;line-height:1.4">${ep.title}</div>
          <div style="font-size:13px;color:var(--ink-muted);line-height:1.55">${ep.desc}</div>
          <a href="${ep.url}" target="_blank"
            style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--orange);margin-top:10px;text-decoration:none">
            ▶ Watch on YouTube
          </a>
        </div>
        <div style="font-size:12px;color:var(--ink-faint);white-space:nowrap;padding-top:14px">${ep.duration}</div>
      </div>`
    ).join('');

    // Cập nhật tổng số eps trong sidebar nếu có
    const countEl = document.getElementById('tbl-podcast-count');
    if (countEl) countEl.textContent = eps.length + ' published';
  }

  // ─── SIDEBAR SERIES LIST (homepage) ─────────────────────────
  function renderSidebarSeries() {
    const sidebar = document.getElementById('tbl-sidebar-series');
    if (!sidebar) return;

    sidebar.innerHTML = TBL.series.map(s => {
      const pub = countPublished(s.code);
      const total = countTotal(s.code);
      return `
        <li class="series-item" onclick="location.href='${root}${s.url}'" style="cursor:pointer">
          <div class="si-left">
            <div class="si-code" style="color:${s.color}">${s.code}</div>
            <div class="si-name">${s.name}</div>
            <div class="si-desc">${s.tags.slice(0, 2).join(' · ')}</div>
          </div>
          <span class="si-count">${pub}/${total}</span>
        </li>`;
    }).join('');
  }

  // ─── CHẠY TẤT CẢ KHI TRANG LOAD ────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectNav();
    injectFooter();
    updateSeriesStats();
    renderArticleFeed();
    renderSeriesCards();
    renderPodcastList();
    renderSidebarSeries();
  });

})();
