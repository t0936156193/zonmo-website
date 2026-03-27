import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Layout renderer
const renderer = jsxRenderer(({ children, title }: { children?: any; title?: string }) => (
  <html lang="zh-TW">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title || '中華鋁模有限公司 | CHUN HAN Engineering'}</title>
      <meta name="description" content="中華鋁模有限公司 - 專業鋁製模板設計、製造及安裝，提供高效、經濟的建築模板解決方案。永續建築，高效施工。" />
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

/* ---- Contact form ---- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ 已收到您的訊息，謝謝！';
    btn.style.background = '#27ae60';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '送出詢問';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

/* ---- Counter animation ---- */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (el.dataset.suffix || '');
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
`

// ── Hero Section ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section class="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-particles"></div>
    <div class="hero-content">
      <div class="hero-logo-wrap">
        <img src="/static/logo.png" alt="中華鋁模有限公司" class="hero-logo-img" />
      </div>
      <div class="hero-badge">
        <i class="fas fa-certificate"></i>
        <span>台灣鋁模板專業領導品牌</span>
      </div>
      <h1 class="hero-title">
        <span class="accent-text">中華鋁模</span>
        <br />有限公司
      </h1>
      <p class="hero-subtitle">
        永續建築，高效施工，中華鋁模是您最佳選擇！
        <br />結合先進鋁合金模板技術，為每個建築項目提供卓越品質。
      </p>
      <div class="hero-buttons">
        <a href="#services" class="btn-primary">
          <i class="fas fa-layer-group"></i>探索服務項目
        </a>
        <a href="#contact" class="btn-outline">
          <i class="fas fa-phone"></i>立即洽詢
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number" data-target="24" data-suffix="+">0+</div>
          <div class="stat-label">年產業經驗</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number" data-target="100" data-suffix="%">0%</div>
          <div class="stat-label">品質保證</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number" data-target="50" data-suffix="+">0+</div>
          <div class="stat-label">工程實績</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number" data-target="2" data-suffix="">0</div>
          <div class="stat-label">戰略夥伴</div>
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
        <span class="partners-label">合作夥伴</span>
        <div class="partner-badge">
          <i class="fas fa-hard-hat"></i>佑昇鷹架
        </div>
        <div class="partner-badge">
          <i class="fas fa-tools"></i>禾鋒鋼筋
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
              <p>CHUN HAN Engineering Company Limited</p>
              <br />
              <p style="font-size:.8rem;opacity:.6">統一編號：54738771</p>
            </div>
          </div>
          <div class="about-badge-corner">
            <div class="num">2000</div>
            <div class="txt">年創立</div>
          </div>
        </div>
        <div class="about-text fade-in">
          <span class="section-label">關於我們</span>
          <h2 class="section-title">從木模到鋁模<br />二十餘年的專業積累</h2>
          <div class="section-divider"></div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">2000 年</div>
                <p>前身「春和企業有限公司」成立，最初專注於木製模板的施工及安裝服務。以優質木模板技術和可靠服務，贏得眾多客戶的信賴與支持。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">2024 年</div>
                <p>負責人王孟源引進先進鋁合金模板體系，大幅提升施工效率與質量，開啟公司新一輪成長契機。高強度、輕便性及耐用性鋁模板為建築行業帶來競爭力解決方案。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-body">
                <div class="timeline-year">更名至今</div>
                <p>正式更名為「中華鋁模有限公司」，專注於鋁製模板設計、製造及安裝，致力成為建築模板行業的領導者，持續創新，為每一個建築項目提供卓越品質和服務。</p>
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
        <span class="section-label">經營理念</span>
        <h2 class="section-title">三大核心價值<br />驅動卓越建築</h2>
        <div class="section-divider"></div>
        <p class="section-desc">
          中華鋁模秉持「專業至上，永續建築，高效低耗」的經營理念，
          致力為客戶提供卓越的鋁製模板解決方案，為建築行業的綠色發展貢獻力量。
        </p>
      </div>
      <div class="values-grid">
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-award"></i></div>
          <h3>專業至上</h3>
          <p>
            專業是成功的基石。我們不斷提升技術和服務水準，確保每個項目都以最高品質完成。
            專業團隊憑藉多年行業經驗，從設計到施工精益求精，為客戶提供最具價值的建築解決方案。
          </p>
        </div>
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-leaf"></i></div>
          <h3>永續建築</h3>
          <p>
            將環保與創新融入產品設計。鋁製模板具有可重複使用、耐用且可回收的特性，
            能顯著減少建築過程中的資源浪費和環境負擔，為建築行業的綠色發展貢獻力量。
          </p>
        </div>
        <div class="value-card fade-in">
          <div class="value-icon"><i class="fas fa-bolt"></i></div>
          <h3>高效低耗</h3>
          <p>
            提供高效施工解決方案，縮短建築周期，降低運營成本，助力客戶以更具競爭力的價格完成項目。
            通過不斷技術創新和流程優化，實現高效率與低成本的完美結合，帶來更多商業價值。
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
          <span class="section-label">服務項目</span>
          <h2 class="section-title">鋁合金系統模板<br />全方位解決方案</h2>
          <div class="section-divider"></div>
          <p class="section-desc">
            結合先進技術與可持續發展理念，提供高效環保的建築模板系統，
            廣泛應用於現代建築工程，推動 ESG 綠色建築標準。
          </p>
          <div class="advantage-list">
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-recycle"></i></div>
              <div class="advantage-text">
                <h4>環保可回收</h4>
                <p>鋁合金材料優異的回收性能，減少施工資源浪費，降低碳排放，符合綠色建築標準。</p>
              </div>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-tachometer-alt"></i></div>
              <div class="advantage-text">
                <h4>施工週期短</h4>
                <p>模板輕便易於安裝和拆卸，設計簡單化使現場作業更高效，顯著縮短整體工期。</p>
              </div>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon"><i class="fas fa-star"></i></div>
              <div class="advantage-text">
                <h4>表面品質優異</h4>
                <p>拆模後混凝土表面平整光滑，減少後續修補需求，降低綜合成本，確保安全可靠性。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="services-cards fade-in">
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-drafting-compass"></i></div>
            <h4>模板設計</h4>
            <p>依工程需求量身規劃鋁合金模板系統，優化結構配置，提供最佳施工方案。</p>
          </div>
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-industry"></i></div>
            <h4>模板製造</h4>
            <p>採用高強度鋁合金材料，精密加工製造，確保模板穩定性與高承載力。</p>
          </div>
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-hard-hat"></i></div>
            <h4>現場安裝</h4>
            <p>專業施工團隊到場安裝，流程標準化操作，保障施工安全性與工程進度。</p>
          </div>
          <div class="service-card">
            <div class="service-card-icon"><i class="fas fa-tools"></i></div>
            <h4>拆卸維護</h4>
            <p>完工後系統性拆卸清潔，模板回收保養，為下次工程備用，實現可持續利用。</p>
          </div>
          <div class="service-card service-card-span">
            <div class="service-card-icon"><i class="fas fa-hard-hat"></i></div>
            <h4>專業施工架（佑昇鷹架 合作服務）</h4>
            <p>與佑昇鷹架策略合作，提供完整鷹架搭設服務，搭配鋁模板施工，一站式承接各類工程需求，確保工地安全效率。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Projects Section ──────────────────────────────────────────────────────────
const Projects = () => (
  <section id="projects" class="projects">
    <div class="container">
      <div class="projects-header fade-in">
        <span class="section-label">工程實績</span>
        <h2 class="section-title">打造每一個高品質工程</h2>
        <div class="section-divider"></div>
      </div>
      <div class="project-showcase fade-in">
        <div class="project-visual">
          <i class="fas fa-city project-visual-icon"></i>
          <div class="project-visual-content">
            <div class="project-name-badge">鳴森院</div>
            <div class="project-type-tag">住宅建案</div>
          </div>
        </div>
        <div class="project-info">
          <h3>鳴森院建案</h3>
          <p>
            採用中華鋁模全套鋁合金系統模板服務，涵蓋模板設計規劃、現場安裝施工到工程完工拆卸。
            本案充分展現鋁模板系統高效施工、混凝土表面平整光滑之優勢，
            大幅縮短施工週期，提升整體工程品質。
          </p>
          <p>
            配合佑昇鷹架提供的安全鷹架搭設，確保工地全程安全高效運作，
            是中華鋁模專業實力的具體展現。
          </p>
          <div class="project-tags">
            <span class="project-tag"><i class="fas fa-check"></i> 鋁合金系統模板</span>
            <span class="project-tag"><i class="fas fa-check"></i> 鷹架工程</span>
            <span class="project-tag"><i class="fas fa-check"></i> 住宅建築</span>
            <span class="project-tag"><i class="fas fa-check"></i> 混凝土施工</span>
          </div>
        </div>
      </div>
      <div class="more-projects-note fade-in">
        <p>
          <strong>持續累積更多工程實績中</strong>——如欲了解詳細工程案例，歡迎
          <a href="#contact" style="color:var(--secondary);font-weight:600">聯絡我們</a>洽詢。
        </p>
      </div>
    </div>
  </section>
)

// ── Contact Section ───────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-header fade-in">
        <span class="section-label">聯絡我們</span>
        <h2 class="section-title">立即洽詢，開啟合作</h2>
        <div class="section-divider"></div>
        <p class="section-desc">無論您有任何工程諮詢、報價需求或合作洽談，我們的專業團隊將盡快回覆您。</p>
      </div>
      <div class="contact-grid">
        <div class="contact-cards fade-in">
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-user-tie"></i></div>
            <div class="contact-card-content">
              <label>負責人</label>
              <span>王孟源</span>
              <small>CHUN HAN Engineering Company Limited</small>
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-phone"></i></div>
            <div class="contact-card-content">
              <label>連絡電話</label>
              <span><a href="tel:0912408777">0912-408-777</a></span>
              <small>歡迎來電洽詢工程事宜</small>
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
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label>您的姓名 *</label>
                <input type="text" placeholder="請輸入姓名" required />
              </div>
              <div class="form-group">
                <label>聯絡電話 *</label>
                <input type="tel" placeholder="請輸入電話" required />
              </div>
            </div>
            <div class="form-group">
              <label>電子信箱</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div class="form-group">
              <label>詢問類別</label>
              <select>
                <option value="">請選擇詢問類別</option>
                <option>鋁合金系統模板諮詢</option>
                <option>工程報價</option>
                <option>鷹架工程</option>
                <option>人才應徵</option>
                <option>其他</option>
              </select>
            </div>
            <div class="form-group">
              <label>訊息內容</label>
              <textarea placeholder="請描述您的工程需求或問題..."></textarea>
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
          <span class="section-label">人才招募</span>
          <h2 class="section-title">加入我們<br />共創建築未來</h2>
          <div class="section-divider"></div>
          <p class="section-desc">
            中華鋁模有限公司是一家致力於提供高品質鋁製模板系統的領先企業。
            隨著公司持續成長，我們誠邀充滿熱情、追求卓越的專業人才加入團隊，共同推動建築行業的革新。
          </p>
          <div class="talent-cards" style="margin-top:32px">
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-medal"></i></div>
              <div>
                <h4>專業精神</h4>
                <p>具備相關行業經驗或專業知識，對工作充滿熱情，追求卓越品質。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-lightbulb"></i></div>
              <div>
                <h4>創新能力</h4>
                <p>敢於挑戰傳統，擁有創新思維，能為公司帶來新的理念和方法。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-users"></i></div>
              <div>
                <h4>團隊合作</h4>
                <p>善於溝通協作，樂於與團隊成員共同努力達成目標。</p>
              </div>
            </div>
            <div class="talent-card">
              <div class="talent-card-icon"><i class="fas fa-shield-alt"></i></div>
              <div>
                <h4>責任感</h4>
                <p>擁有高度責任心，能在壓力下保持高效工作效率。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="benefits-box fade-in">
          <h3><i class="fas fa-gift"></i> 我們提供的機會</h3>
          <div class="benefits-grid">
            <div class="benefit-item">
              <i class="fas fa-graduation-cap"></i>
              <strong>專業成長</strong>
              <p>定期培訓與工作坊，提升專業技能</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-chart-line"></i>
              <strong>職業發展</strong>
              <p>明確晉升路徑，鼓勵長期發展</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-building"></i>
              <strong>舒適環境</strong>
              <p>支持創意的工作氛圍</p>
            </div>
            <div class="benefit-item">
              <i class="fas fa-hand-holding-usd"></i>
              <strong>員工福利</strong>
              <p>具競爭力薪酬與完善健康保險</p>
            </div>
          </div>
          <div class="apply-cta">
            <p>如果您渴望在快速發展的公司中展現自我，歡迎將個人履歷傳送至我們的招募信箱。</p>
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
            <img src="/static/logo.png" alt="中華鋁模有限公司 Logo" class="footer-logo-img" />
            <div class="nav-logo-text">
              <div class="cn">中華鋁模有限公司</div>
              <div class="en">CHUN HAN Engineering Co., Ltd.</div>
            </div>
          </div>
          <p>專業鋁製模板設計、製造及安裝，提供高效、經濟的建築模板解決方案。致力成為建築模板行業的領導者，持續創新，為每一個建築項目提供卓越品質和服務。</p>
          <div class="footer-reg">統一編號：54738771</div>
        </div>
        <div class="footer-col">
          <h4>網站導覽</h4>
          <ul>
            <li><a href="#about"><i class="fas fa-chevron-right"></i> 關於我們</a></li>
            <li><a href="#values"><i class="fas fa-chevron-right"></i> 經營理念</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 服務項目</a></li>
            <li><a href="#projects"><i class="fas fa-chevron-right"></i> 工程實績</a></li>
            <li><a href="#contact"><i class="fas fa-chevron-right"></i> 聯絡我們</a></li>
            <li><a href="#recruitment"><i class="fas fa-chevron-right"></i> 人才招募</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>服務項目</h4>
          <ul>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 鋁合金系統模板</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 模板設計規劃</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 現場安裝施工</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 拆卸維護</a></li>
            <li><a href="#services"><i class="fas fa-chevron-right"></i> 專業施工架</a></li>
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
            <a href="tel:0912408777">0912-408-777</a>
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
          <p>若您對本隱私政策有任何疑問，請聯絡：<br />電話：0912-408-777<br />信箱：zonmo1961@gmail.com<br />地址：新北市汐止區東勢街201巷326號</p>
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
          <img src="/static/logo.png" alt="中華鋁模有限公司 Logo" class="nav-logo-img" />
          <div class="nav-logo-text">
            <div class="cn">中華鋁模有限公司</div>
            <div class="en">CHUN HAN Engineering</div>
          </div>
        </a>
        <div class="nav-links">
          <a href="#about">關於我們</a>
          <a href="#values">經營理念</a>
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
    { title: '中華鋁模有限公司 | 永續建築，高效施工' }
  )
})

export default app
