import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// SEO files — 直接回傳內容（Cloudflare Workers 不支援 fs）
app.get('/robots.txt', (c) => c.text(
`User-agent: *
Allow: /

Sitemap: https://zonmo.com.tw/sitemap.xml
`))

app.get('/sitemap.xml', (c) => {
  c.header('Content-Type', 'application/xml')
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zonmo.com.tw/</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://zonmo.com.tw/#about</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://zonmo.com.tw/#services</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://zonmo.com.tw/#projects</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://zonmo.com.tw/#contact</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`)
})

// Layout renderer
const renderer = jsxRenderer(({ children, title }: { children?: any; title?: string }) => (
  <html lang="zh-TW">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title || '中華鋁模有限公司 | 鋁合金模板・逆打工法工程專家'}</title>
      <meta name="description" content="中華鋁模有限公司專注鋁合金模板、傳統模板與地下結構／逆打工法施工，具住宅、產業園區、公共建設與土木工程實績，累計承攬總額逾 5.7 億，提供精準、高效、安全的模板工程解決方案。" />
      <meta name="keywords" content="中華鋁模,鋁合金模板,傳統模板,逆打工法,地下結構工程,模板工程,系統模板,建築模板,鋁模施工,模板安裝" />
      <meta name="author" content="中華鋁模有限公司" />
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content="Ll-yl3BPYIUyH3Seo7deWAz9BwkrG6YD_fUNLJT8OQU" />
      <link rel="canonical" href="https://zonmo.com.tw/" />

      {/* Open Graph (Facebook / LINE 分享預覽) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://zonmo.com.tw/" />
      <meta property="og:title" content="中華鋁模有限公司 | 鋁合金模板・逆打工法工程專家" />
      <meta property="og:description" content="專注鋁合金模板、傳統模板與地下結構／逆打工法，累計承攬總額逾 5.7 億，為住宅、商業與公共建設提供精準施工服務。" />
      <meta property="og:site_name" content="中華鋁模有限公司" />
      <meta property="og:locale" content="zh_TW" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="中華鋁模有限公司 | 鋁合金模板・逆打工法工程專家" />
      <meta name="twitter:description" content="專注鋁合金模板、傳統模板與逆打工法施工，具深地下工程與大型建案實績。" />

      {/* 結構化資料 JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "中華鋁模有限公司",
        "alternateName": "ZON MO Co., Ltd.",
        "url": "https://zonmo.com.tw",
        "telephone": "+886-920-880-654",
        "description": "專注鋁合金模板、傳統模板與地下結構／逆打工法施工，承接住宅、產業園區、公共建設與土木工程模板工程。",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "TW",
          "addressRegion": "新北市"
        },
        "foundingDate": "2000",
        "areaServed": ["台北市", "新北市", "桃園市"],
        "serviceType": ["鋁合金模板工程", "傳統模板工程", "地下結構工程", "逆打工法施工"]
      })}} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;800;900&display=swap" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      {children}
      <script dangerouslySetInnerHTML={{ __html: mainScript }} />
    </body>
  </html>
))

app.use(renderer)

// ── Main script ─────────────────────────────────────────────────────────────
const mainScript = `
/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile hamburger ---- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ---- Active nav link ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ---- Scroll-top button ---- */
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Fade-in on scroll ---- */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObs.observe(el));

/* ---- Privacy modal ---- */
const modal = document.getElementById('privacy-modal');
document.querySelectorAll('[data-modal="privacy"]').forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); modal.classList.add('open'); });
});
document.getElementById('modal-close-btn').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

/* ---- Contact form (Formspree) ---- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '傳送中...';
    btn.disabled = true;
    try {
      const data = new FormData(form);
      const res = await fetch('https://formspree.io/f/xkopgqdj', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ 已送出！我們將盡快與您聯繫';
        btn.style.background = '#1a6e96';
        form.reset();
        setTimeout(() => {
          btn.textContent = '送出詢問';
          btn.style.background = '';
          btn.disabled = false;
        }, 5000);
      } else {
        throw new Error('送出失敗');
      }
    } catch(err) {
      btn.textContent = '✗ 送出失敗，請直接來電洽詢';
      btn.style.background = '#c0392b';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = '送出詢問';
        btn.style.background = '';
      }, 4000);
    }
  });
}

/* ---- Counter animation ---- */
function animateCount(el) {
  const target = parseFloat(el.dataset.target || '0');
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.max(target / 60, Math.pow(10, -decimals));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + current.toFixed(decimals) + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); } });
}, { threshold: .5 });
document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el));

/* ---- Particles ---- */
const container = document.querySelector('.hero-particles');
if (container) {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.style.cssText = 'left:' + Math.random()*100 + '%;top:' + (60+Math.random()*40) + '%;animation-duration:' + (8+Math.random()*12) + 's;animation-delay:' + (Math.random()*8) + 's;width:' + (2+Math.random()*3) + 'px;height:' + (2+Math.random()*3) + 'px';
    container.appendChild(s);
  }
}

/* ---- Photo Slider ---- */
(function() {
  const slides   = document.querySelectorAll('#mainSlider .slide');
  const dots     = document.querySelectorAll('#sliderDots .dot');
  const thumbs   = document.querySelectorAll('#thumbStrip .thumb');
  const counter  = document.getElementById('sliderCounter');
  const total    = slides.length;
  let current    = 0;
  let autoTimer  = null;

  function goTo(idx, scrollThumb) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    thumbs[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + total;
    // 只有使用者主動點擊縮圖/按鈕時才捲動縮圖列，避免頁面自動跳位
    if (scrollThumb) {
      thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1, false), 4000); }
  function stopAuto()  { clearInterval(autoTimer); }

  document.getElementById('sliderNext').addEventListener('click', () => { stopAuto(); goTo(current + 1, true); startAuto(); });
  document.getElementById('sliderPrev').addEventListener('click', () => { stopAuto(); goTo(current - 1, true); startAuto(); });

  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i, true); startAuto(); }));
  thumbs.forEach((t, i) => t.addEventListener('click', () => { stopAuto(); goTo(i, false); startAuto(); }));

  // swipe support
  let touchX = 0;
  const sliderEl = document.getElementById('mainSlider');
  sliderEl.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { stopAuto(); goTo(current + (dx < 0 ? 1 : -1), false); startAuto(); }
  });

  startAuto();

  /* ---- Lightbox ---- */
  const photoSrcs  = Array.from(slides).map(s => s.querySelector('img').src);
  const photoCaps  = Array.from(slides).map(s => s.querySelector('.slide-text').textContent);
  const lb         = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbCaption  = document.getElementById('lbCaption');
  let lbCurrent    = 0;

  function openLb(idx) {
    lbCurrent = idx;
    lbImg.src = photoSrcs[idx];
    lbCaption.textContent = photoCaps[idx];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function lbGo(d)   { lbCurrent = (lbCurrent + d + total) % total; lbImg.src = photoSrcs[lbCurrent]; lbCaption.textContent = photoCaps[lbCurrent]; }

  slides.forEach((s, i) => s.querySelector('img').addEventListener('click', () => openLb(i)));
  thumbs.forEach((t, i) => { /* double-click or open via slider */ });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click',  () => lbGo(-1));
  document.getElementById('lbNext').addEventListener('click',  () => lbGo(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  lbGo(-1);
    if (e.key === 'ArrowRight') lbGo(1);
  });
})();
`

// ── Hero Section ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section class="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-particles"></div>
    <div class="hero-content">
      <div class="hero-logo-wrap">
        <img src="/static/logo_white.png" alt="中華鋁模有限公司" class="hero-logo-img" />
      </div>
      <div class="hero-badge">
        <i class="fas fa-grip-lines"></i>
        <span>TRUSTED PARTNER · BUILD WITH EXCELLENCE</span>
      </div>
      <h1 class="hero-title">
        <span class="accent-text">築基深地</span>
        <br />鑄造卓越
      </h1>
      <p class="hero-subtitle">
        中華鋁模有限公司｜專業模板工程的精準施工品質
        <br />專注鋁合金模板、傳統模板與地下結構／逆打工法，成為您值得信賴的建築夥伴。
      </p>
      <div class="hero-buttons">
        <a href="#services" class="btn-primary">
          <i class="fas fa-layer-group"></i>探索三大服務
        </a>
        <a href="#contact" class="btn-outline">
          <i class="fas fa-phone"></i>立即洽詢
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number" data-target="5.7" data-decimals="1" data-suffix=" 億+">0</div>
          <div class="stat-label">累計承攬總額</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="2.4" data-decimals="1" data-suffix=" 億+">0</div>
          <div class="stat-label">單案最高承攬</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="5" data-prefix="B">0</div>
          <div class="stat-label">最深地下層實績</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="6" data-suffix="+">0+</div>
          <div class="stat-label">代表工程案例</div>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      <span>SCROLL</span>
    </div>
  </section>
)

// ── Partners Bar ──────────────────────────────────────────────────────────────
const PartnersBar = () => (
  <div class="partners-bar">
    <div class="container">
      <div class="partners-inner">
        <span class="partners-label">協力合作夥伴</span>
        <div class="partner-badge">
          <img src="/static/logo-yoson.jpg" alt="佑昇鷹架" class="partner-badge-logo" />
          <a href="https://www.yosonsf.com/" target="_blank" rel="noopener noreferrer" class="partner-badge-link">佑昇鷹架</a>
        </div>
        <div class="partner-badge-sep"></div>
        <div class="partner-badge">
          <img src="/static/logo-hefeng.jpg" alt="禾鋒鋼筋" class="partner-badge-logo" />
          <span>禾鋒鋼筋</span>
        </div>
      </div>
    </div>
  </div>
)

// ── About Section ─────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-visual fade-in">
          <div class="about-img-box">
            <i class="fas fa-building about-icon-main"></i>
            <div class="about-img-text">
              <h3>中華鋁模有限公司</h3>
              <p>ZON MO Co., Ltd.</p>
              <br />
              <p style="font-size:.8rem;opacity:.6">統一編號：54738771</p>
            </div>
            <div class="about-badge-corner">
              <div class="num">2000</div>
              <div class="txt">年創立</div>
            </div>
          </div>
        </div>
        <div class="about-text fade-in">
          <span class="section-label">ABOUT US</span>
          <h2 class="section-title">模板工程深耕多年<br />聚焦鋁模與深地下工程</h2>
          <div class="section-divider"></div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">2000 年</div>
                <p>前身以模板工程施工與現場管理起家，逐步累積住宅、公共建設與土木工程所需的實務經驗，建立穩定的施工基礎與協作能力。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">2024 年</div>
                <p>聚焦鋁合金模板、傳統模板與地下結構工程，導入更高效率的系統化施作流程，對應住宅量產案、公共工程與深地下案型需求。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">發展至今</div>
                <p>持續承攬大型住宅、產業園區、公共建設與土木工程，累計承攬總額逾 5.7 億，並以安全、精準、如期交付作為每一案的核心承諾。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Values Section ────────────────────────────────────────────────────────────
const Values = () => (
  <section id="values" class="values">
    <div class="container">
      <div class="values-header fade-in">
        <span class="section-label">CORE VALUES</span>
        <h2 class="section-title">三大核心優勢<br />驅動工程交付</h2>
        <div class="section-divider"></div>
        <p class="section-desc">
          中華鋁模以精準施工、深地下經驗與效率控管為核心，
          對應不同案型的模板需求，協助業主在安全、品質與進度之間取得最佳平衡。
        </p>
      </div>
      <div class="values-grid">
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-award"></i></div>
          <h3>精準施工</h3>
          <p>
            從模板配置、現場放樣到安裝拆模，建立清楚的施工節點與品質標準，
            讓工程在複雜條件下仍能維持穩定度與整體完成度。
          </p>
        </div>
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-leaf"></i></div>
          <h3>深地下經驗</h3>
          <p>
            具地下結構與逆打工法施作經驗，可因應深開挖、鄰房敏感區域與多工種交界條件，
            協助工程在安全管理與施工順序上更有系統。
          </p>
        </div>
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-bolt"></i></div>
          <h3>效率與成本控管</h3>
          <p>
            透過系統化模板規劃與現場整合，降低重工與錯誤率，提升週轉效率，
            讓業主在品質、進度與整體成本之間擁有更可預期的交付成果。
          </p>
        </div>
      </div>
    </div>
  </section>
)

// ── Services Section ──────────────────────────────────────────────────────────
const Services = () => (
  <section id="services" class="services">
    <div class="container">
      <div class="services-layout">
        <div class="services-info fade-in">
          <span class="section-label">OUR SERVICES</span>
          <h2 class="section-title">三大工程服務<br />對應不同案型需求</h2>
          <div class="section-divider"></div>
          <p class="section-desc">
            依據銷售簡報內容，中華鋁模的核心服務聚焦於鋁合金模板、傳統模板與地下結構／逆打工法，
            從規劃到現場施作提供可落地的整合方案。
          </p>
          <div class="advantage-list">
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-recycle"></i></div>
              <div class="advantage-text">
                <h4>鋁模高精度</h4>
                <p>鋁合金模板具高精度與重複使用特性，適合標準化程度高的住宅與商業建築案型。</p>
              </div>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-tachometer-alt"></i></div>
              <div class="advantage-text">
                <h4>傳統模板彈性高</h4>
                <p>可依結構條件與特殊工法調整，適用公共建設、地下構造與非標準化施工需求。</p>
              </div>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-star"></i></div>
              <div class="advantage-text">
                <h4>深地下施作整合</h4>
                <p>具地下 B5 案型與逆打工法經驗，可搭配多工種介面管理，提升深開挖工程協調效率。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="services-cards fade-in">
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-drafting-compass"></i></div>
            <h4>鋁合金模板工程</h4>
            <p>以高精度、可重複使用與快速週轉為特色，對應住宅與大型量體建築的模板施作需求。</p>
          </div>
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-hard-hat"></i></div>
            <h4>傳統模板工程</h4>
            <p>依現場條件進行客製化配置，滿足公共建設、特殊造型與複雜結構的施工需求。</p>
          </div>
          <div class="service-card service-card-span">
            <div class="service-card-icon"><i class="fas fa-tools"></i></div>
            <h4>地下結構／逆打工法</h4>
            <p>針對深地下層、鄰房敏感與工序密集案型，提供更重視安全管理與施工順序的專業施作服務。</p>
          </div>
          {/* 協力合作廠商 */}
          <div class="service-card service-card-span partner-card">
            <div class="partner-card-header">
              <i class="fas fa-handshake"></i>
              <span>協力合作廠商</span>
            </div>
            <div class="partner-card-body">
              <div class="partner-item">
                <img src="/static/logo-yoson.jpg" alt="佑昇鷹架" class="partner-logo-img" />
                <div class="partner-item-text">
                  <h5>佑昇鷹架 <small>YO SON SCAFFOLDING</small></h5>
                  <p>專業鷹架搭設服務，搭配模板與地下結構施作，協助建立完整且安全的施工平台。</p>
                  <a href="https://www.yosonsf.com/" target="_blank" rel="noopener noreferrer" class="partner-website-link">
                    <i class="fas fa-globe"></i> 造訪官方網站
                  </a>
                </div>
              </div>
              <div class="partner-divider"></div>
              <div class="partner-item">
                <img src="/static/logo-hefeng.jpg" alt="禾鋒鋼筋" class="partner-logo-img" />
                <div class="partner-item-text">
                  <h5>禾鋒鋼筋</h5>
                  <p>與模板工程緊密協作的鋼筋加工夥伴，共同強化現場整合效率與結構品質。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Projects Section ──────────────────────────────────────────────────────────
const photoData = [
  { src: '/static/photos/work-01.jpg', caption: '鋁模板現場組裝作業', tag: '模板安裝' },
  { src: '/static/photos/work-02.jpg', caption: '高空鷹架精密施工中', tag: '鷹架工程' },
  { src: '/static/photos/work-03.jpg', caption: '鋁模板大面積牆面安裝', tag: '模板安裝' },
  { src: '/static/photos/work-04.jpg', caption: '工地多人協同作業', tag: '施工現場' },
  { src: '/static/photos/work-05.jpg', caption: '模板精準對位施工', tag: '精密施工' },
  { src: '/static/photos/work-06.jpg', caption: '天花板底模安裝作業', tag: '天花板模板' },
  { src: '/static/photos/work-07.jpg', caption: '室內雷射水平校準', tag: '精密測量' },
  { src: '/static/photos/work-08.jpg', caption: '模板拆卸精細操作', tag: '拆模作業' },
  { src: '/static/photos/work-09.jpg', caption: '鋁合金模板牆體組立施工', tag: '模板安裝' },
  { src: '/static/photos/work-10.jpg', caption: '鋁模板系統備料整備', tag: '材料管理' },
  { src: '/static/photos/work-12.jpg', caption: '天花板鋁模板底層施工', tag: '樓板模板' },
  { src: '/static/photos/work-13.jpg', caption: '鋁模板節點接合細部', tag: '精密施工' },
]

// 代表工程實績資料
const projectRecords = [
  {
    no: '01',
    owner: '中華工程',
    name: '中工雲宇宙產業園區新建工程',
    subName: '模板工程（二）',
    location: '新北市土城',
    floors: '16F / B5',
    amount: '2,700 萬',
    tag: '產業園區',
    icon: 'fas fa-industry',
    type: '商業建築',
  },
  {
    no: '02',
    owner: '中華工程',
    name: '鳴森苑住宅新建工程',
    subName: '鋁製模板工程',
    location: '台北市松山區',
    floors: 'B4',
    amount: '2 億 4,000 萬',
    tag: '住宅建案',
    icon: 'fas fa-building',
    type: '住宅建築',
  },
  {
    no: '03',
    owner: '中華工程',
    name: '鳴森苑住宅新建工程',
    subName: '模板工程',
    location: '台北市松山區',
    floors: '21F',
    amount: '1 億 4,000 萬',
    tag: '住宅建案',
    icon: 'fas fa-building',
    type: '住宅建築',
  },
  {
    no: '04',
    owner: '宏昇營造',
    name: '大直軍事博物館',
    subName: '模板工程',
    location: '台北市大直',
    floors: '地上 7 層 / 地下 3 層',
    amount: '5,500 萬',
    tag: '公共建設',
    icon: 'fas fa-landmark',
    type: '公共建築',
  },
  {
    no: '05',
    owner: '中華工程',
    name: '廣三滯洪池工程',
    subName: '模板工程',
    location: '新北市新莊',
    floors: '地下滯洪池',
    amount: '2,700 萬',
    tag: '公共建設',
    icon: 'fas fa-water',
    type: '水利工程',
  },
  {
    no: '06',
    owner: '萬鼎工程',
    name: '涵洞／排水工程',
    subName: '模板工程',
    location: '桃園市龜山',
    floors: '涵洞工程',
    amount: '7,000 萬',
    tag: '基礎工程',
    icon: 'fas fa-hard-hat',
    type: '土木工程',
  },
]

const Projects = () => (
  <section id="projects" class="projects">
    <div class="container">
      {/* Header */}
      <div class="projects-header fade-in">
        <span class="section-label">PROJECTS</span>
        <h2 class="section-title">工程實績，品質驗證</h2>
        <div class="section-divider"></div>
        <p class="section-desc" style="margin:0 auto">累計承攬總額逾 5.7 億，代表工程涵蓋住宅、產業園區、公共建設與土木工程，展現中華鋁模在不同案型中的整合能力與交付經驗。</p>
      </div>

      {/* 代表工程實績列表 */}
      <div class="records-wrap fade-in">
        <div class="records-header">
          <i class="fas fa-clipboard-list"></i>
          <span>工程實績一覽</span>
        </div>
        <div class="records-table">
          {/* Table Header */}
          <div class="records-thead">
            <div class="rec-col rec-no">編號</div>
            <div class="rec-col rec-name">工地名稱</div>
            <div class="rec-col rec-loc">地點</div>
            <div class="rec-col rec-floors">規模</div>
            <div class="rec-col rec-amount">合約金額</div>
          </div>
          {/* Table Rows */}
          {projectRecords.map((r, i) => (
            <div class="records-row fade-in" key={i}>
              <div class="rec-col rec-no">
                <span class="rec-no-num">{r.no}</span>
              </div>
              <div class="rec-col rec-name">
                <div class="rec-name-wrap">
                  <i class={r.icon + ' rec-icon'}></i>
                  <div>
                    <div class="rec-name-main">{r.name}</div>
                    <div class="rec-name-sub">{r.subName}</div>
                  </div>
                </div>
                <span class="rec-tag">{r.tag}</span>
              </div>
              <div class="rec-col rec-loc">
                <i class="fas fa-map-marker-alt rec-loc-icon"></i>
                {r.location}
              </div>
              <div class="rec-col rec-floors">
                <i class="fas fa-layer-group rec-floors-icon"></i>
                {r.floors}
              </div>
              <div class="rec-col rec-amount">
                <span class="rec-amount-val">{r.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 施工照片區標題 */}
      <div class="photo-section-header fade-in">
        <div class="photo-section-label">
          <i class="fas fa-camera"></i>
          <span>施工實況照片</span>
        </div>
        <p class="photo-section-note">鳴森苑建案｜鋁合金模板施作實況紀錄</p>
      </div>

      {/* Main Slider */}
      <div class="slider-wrap fade-in">
        <div class="slider" id="mainSlider">
          {photoData.map((p, i) => (
            <div class={`slide${i === 0 ? ' active' : ''}`} key={i}>
              <img src={p.src} alt={p.caption} loading={i === 0 ? 'eager' : 'lazy'} />
              <div class="slide-caption">
                <span class="slide-tag">{p.tag}</span>
                <span class="slide-text">{p.caption}</span>
              </div>
            </div>
          ))}
        </div>
        <button class="slider-btn slider-prev" id="sliderPrev" aria-label="上一張">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="slider-btn slider-next" id="sliderNext" aria-label="下一張">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="slider-dots" id="sliderDots">
          {photoData.map((_, i) => (
            <button class={`dot${i === 0 ? ' active' : ''}`} data-index={i} key={i} aria-label={`第${i+1}張`}></button>
          ))}
        </div>
        <div class="slider-counter" id="sliderCounter">1 / {photoData.length}</div>
      </div>

      {/* Thumbnail Strip */}
      <div class="thumb-strip fade-in" id="thumbStrip">
        {photoData.map((p, i) => (
          <div class={`thumb${i === 0 ? ' active' : ''}`} data-index={i} key={i}>
            <img src={p.src} alt={p.caption} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div id="lightbox" class="lightbox-overlay">
        <button class="lightbox-close" id="lbClose"><i class="fas fa-times"></i></button>
        <button class="lightbox-nav lightbox-prev" id="lbPrev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-nav lightbox-next" id="lbNext"><i class="fas fa-chevron-right"></i></button>
        <div class="lightbox-img-wrap">
          <img id="lbImg" src="" alt="" />
          <div class="lightbox-caption" id="lbCaption"></div>
        </div>
      </div>
    </div>
  </section>
)

// ── Contact Section ───────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-header fade-in">
        <span class="section-label">CONTACT US</span>
        <h2 class="section-title">立即洽詢，啟動工程合作</h2>
        <div class="section-divider"></div>
        <p class="section-desc">歡迎洽詢鋁合金模板、傳統模板、地下結構或逆打工法需求，我們將依案型提供對應建議與合作評估。</p>
      </div>
      <div class="contact-grid">
        <div class="contact-cards fade-in">
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-user-tie"></i></div>
            <div class="contact-card-content">
              <label>工程洽詢窗口</label>
              <span>王孟源</span>
              <small>中華鋁模有限公司</small>
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-phone"></i></div>
            <div class="contact-card-content">
              <label>聯絡電話</label>
              <span><a href="tel:0920880654">0920-880-654（王先生）</a></span>
              <small>歡迎來電洽詢工程與合作事宜</small>
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
            <div class="contact-card-content">
              <label>電子信箱</label>
              <span><a href="mailto:zonmo1961@gmail.com">zonmo1961@gmail.com</a></span>
              <small>工作時間內儘速回覆</small>
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="contact-card-content">
              <label>公司地址</label>
              <span>新北市汐止區東勢街201巷326號</span>
              <small>歡迎預約前來拜訪洽談</small>
            </div>
          </div>
        </div>
        <div class="contact-form-box fade-in">
          <h3><i class="fas fa-paper-plane" style="color:var(--accent);margin-right:10px"></i>傳送訊息給我們</h3>
          <form id="contact-form" action="https://formspree.io/f/xkopgqdj" method="POST">
            <div class="form-row">
              <div class="form-group">
                <label>您的姓名 *</label>
                <input type="text" name="姓名" placeholder="請輸入姓名" required />
              </div>
              <div class="form-group">
                <label>聯絡電話 *</label>
                <input type="tel" name="電話" placeholder="請輸入電話" required />
              </div>
            </div>
            <div class="form-group">
              <label>電子信箱</label>
              <input type="email" name="email" placeholder="your@email.com" />
            </div>
            <div class="form-group">
              <label>詢問類別</label>
              <select name="詢問類別">
                <option value="">請選擇詢問類別</option>
                <option>鋁合金模板工程諮詢</option>
                <option>傳統模板工程諮詢</option>
                <option>地下結構／逆打工法諮詢</option>
                <option>工程報價</option>
                <option>人才應徵</option>
                <option>其他</option>
              </select>
            </div>
            <div class="form-group">
              <label>訊息內容</label>
              <textarea name="訊息內容" placeholder="請描述您的工程需求或問題..."></textarea>
            </div>
            <button type="submit" class="form-submit">
              <i class="fas fa-paper-plane"></i> 送出詢問
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
)

// ── Recruitment Section ───────────────────────────────────────────────────────
const Recruitment = () => (
  <section id="recruitment" class="recruitment">
    <div class="container">
      <div class="recruitment-grid">
        <div class="recruitment-intro fade-in">
          <span class="section-label">JOIN OUR TEAM</span>
          <h2 class="section-title">加入我們<br />一起把每一層樓做好</h2>
          <div class="section-divider"></div>
          <p class="section-desc">
            每一層樓，都是我們的承諾。
            我們誠摯邀請具模板、工務、現場施工與工程管理經驗的人才加入，一起完成住宅、公共建設與深地下工程的關鍵任務。
          </p>
          <div class="talent-cards" style="margin-top:32px">
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-medal"></i></div>
              <div>
                <h4>現場執行</h4>
                <p>熟悉工地節奏、重視施工品質，能在現場落實圖面、工序與交付標準。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-lightbulb"></i></div>
              <div>
                <h4>安全意識</h4>
                <p>理解深地下與多工種交界風險，願意把安全管理落實到每日作業細節。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-users"></i></div>
              <div>
                <h4>團隊協作</h4>
                <p>能與工地主任、協力廠商與現場班組有效協調，讓工程節奏更順暢。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-shield-alt"></i></div>
              <div>
                <h4>責任交付</h4>
                <p>對進度、品質與收尾成果負責，確保每一道工序都能安心交給下一班。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="benefits-box fade-in">
          <h3><i class="fas fa-gift"></i> 我們提供的發展機會</h3>
          <div class="benefits-grid">
            <div class="benefit-item">
              <i class="fas fa-graduation-cap"></i>
              <strong>大型案型歷練</strong>
              <p>參與住宅、產業園區、公共建設與深地下工程實務</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-chart-line"></i>
              <strong>穩定成長</strong>
              <p>隨公司案量與組織擴大，提供長期投入與發展空間</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-building"></i>
              <strong>技術學習</strong>
              <p>累積鋁模、傳統模板與地下結構相關施工知識</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-hand-holding-usd"></i>
              <strong>依法福利</strong>
              <p>提供具競爭力待遇與完善勞健保制度</p>
            </div>
          </div>
          <div class="apply-cta">
            <p>若您認同品質、安全與責任交付的工作態度，歡迎將履歷寄送至招募信箱與我們聯繫。</p>
            <a href="mailto:zonmo1961@gmail.com?subject=應徵中華鋁模有限公司職位">
              <i class="fas fa-envelope"></i>立即投遞履歷
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo">
            <img src="/static/logo_white.png" alt="中華鋁模有限公司 Logo" class="footer-logo-img" />
            <div class="nav-logo-text">
              <div class="cn">中華鋁模有限公司</div>
              <div class="en">ZON MO Co., Ltd.</div>
            </div>
          </div>
          <p>專注鋁合金模板、傳統模板與地下結構／逆打工法施工，累積住宅、產業園區、公共建設與土木工程實績，提供值得信賴的模板工程解決方案。</p>
          <div class="footer-reg">統一編號：54738771</div>
        </div>
        <div class="footer-col">
          <h4>網站導覽</h4>
          <ul>
            <li><a href="#about"><i class="fas fa-chevron-right"></i> 關於我們</a></li>
            <li><a href="#values"><i class="fas fa-chevron-right"></i> 核心優勢</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 服務項目</a></li>
            <li><a href="#projects"><i class="fas fa-chevron-right"></i> 工程實績</a></li>
            <li><a href="#contact"><i class="fas fa-chevron-right"></i> 聯絡我們</a></li>
            <li><a href="#recruitment"><i class="fas fa-chevron-right"></i> 人才招募</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>服務項目</h4>
          <ul>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 鋁合金模板工程</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 傳統模板工程</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 地下結構工程</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 逆打工法施工</a></li>
            <li><a href="https://www.yosonsf.com/" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> 佑昇鷹架（協力）</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 禾鋒鋼筋（協力）</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>聯絡資訊</h4>
          <div class="footer-contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>新北市汐止區東勢街201巷326號</span>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-phone"></i>
            <a href="tel:0920880654">0920-880-654（王先生）</a>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:zonmo1961@gmail.com">zonmo1961@gmail.com</a>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-globe"></i>
            <span>zonmo.com.tw</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2025 ZONMO · 中華鋁模有限公司 · All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#" data-modal="privacy">隱私政策</a>
          <a href="#contact">聯絡我們</a>
        </div>
      </div>
    </div>

    {/* Privacy Modal */}
    <div id="privacy-modal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2><i class="fas fa-shield-alt" style="margin-right:10px"></i>隱私政策</h2>
          <button id="modal-close-btn" class="modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <p>最後更新：2025 年 1 月</p>
          <h3>一、資料蒐集與使用目的</h3>
          <p>中華鋁模有限公司（以下簡稱「本公司」）在您使用本網站服務時，可能蒐集您的個人資料，包含：姓名、聯絡電話、電子信箱及詢問內容。蒐集目的為提供工程諮詢回覆、聯絡洽談及後續服務。</p>
          <h3>二、資料保護</h3>
          <p>本公司依據《個人資料保護法》相關規定，以合理之技術及管理措施，保護您所提供之個人資料，防止未經授權之存取、使用或揭露。本公司不會將您的個人資料出售、出租或以其他方式移轉給第三方，除非獲得您的同意或依法令規定。</p>
          <h3>三、Cookie 使用</h3>
          <p>本網站可能使用 Cookie 技術以改善使用體驗。您可透過瀏覽器設定關閉 Cookie，惟部分功能可能因此受到影響。</p>
          <h3>四、資料當事人之權利</h3>
          <p>依《個人資料保護法》，您享有查詢、閱覽、複製、補充、更正、限制處理及刪除個人資料之權利。如欲行使上述權利，請聯絡本公司：zonmo1961@gmail.com。</p>
          <h3>五、政策修訂</h3>
          <p>本公司保留隨時修訂本隱私政策之權利，修訂後將公告於本網站。如您繼續使用本網站服務，視為同意修訂後之條款。</p>
          <h3>六、聯絡方式</h3>
          <p>若您對本隱私政策有任何疑問，請聯絡：<br />電話：0920-880-654（王先生）<br />信箱：zonmo1961@gmail.com<br />地址：新北市汐止區東勢街201巷326號</p>
        </div>
      </div>
    </div>
  </footer>
)

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => (
  <nav id="navbar">
    <div class="container">
      <div class="nav-inner">
        <a href="/" class="nav-logo">
          <img src="/static/logo_white.png" alt="中華鋁模有限公司 Logo" class="nav-logo-img" />
          <div class="nav-logo-text">
            <div class="cn">中華鋁模有限公司</div>
            <div class="en">ZON MO</div>
          </div>
        </a>
        <div class="nav-links">
          <a href="#about">關於我們</a>
          <a href="#values">核心優勢</a>
          <a href="#services">服務項目</a>
          <a href="#projects">工程實績</a>
          <a href="#recruitment">人才招募</a>
          <a href="#contact" class="nav-cta">立即洽詢</a>
        </div>
        <div class="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </nav>
)

// ── Main route ────────────────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.render(
    <>
      <Navbar />
      <Hero />
      <PartnersBar />
      <About />
      <Values />
      <Services />
      <Projects />
      <Contact />
      <Recruitment />
      <Footer />
      <button id="scroll-top" title="回到頂端"><i class="fas fa-chevron-up"></i></button>
    </>,
    { title: '中華鋁模有限公司 | 鋁合金模板・逆打工法工程專家' }
  )
})

export default app
