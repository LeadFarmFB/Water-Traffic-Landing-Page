import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, X } from 'lucide-react';

type Language = 'ua' | 'en';
const CONTACT = 'https://t.me/WaterTraffic_Manager';
const PRESETS = [5000, 15000, 25000, 50000, 100000, 250000];
const money = (amount: number) => `$${Math.round(amount).toLocaleString('en-US')}`;

const words = {
  ua: {
    nav: [['calculator', 'Калькулятор'], ['platforms', 'Платформи'], ['comparison', 'Порівняння'], ['infrastructure', 'Інфраструктура'], ['pricing', 'Тарифи']],
    contact: "Зв'язатися",
    eyebrow: 'ІНФРАСТРУКТУРА ДЛЯ МАСШТАБУВАННЯ',
    heroTitle: <>Запускайте рекламу<br /><span>без банів та обмежень</span></>,
    heroCopy: 'Преміальні агентські акаунти з високим спендом для арбітражу та масштабування бізнесу. Миттєва заміна при блокуваннях, трастові BIN та 100% збереження залишку на балансі.',
    accounts: 'Отримати акаунти через Telegram',
    calcCta: 'Розрахувати бюджет',
    detail: 'АГЕНТСЬКІ АКАУНТИ · ПЕРСОНАЛЬНА ПІДТРИМКА',
    diagram: 'РЕКЛАМНА ІНФРАСТРУКТУРА',
    sectionCalculator: <>Інтерактивний <span>калькулятор</span></>,
    sectionSubCalc: 'Оцініть комісію за місячним рекламним бюджетом. Ставка залежить від обсягу.',
    budgetLabel: 'Запланований місячний бюджет',
    minimum: '$1,000', maximum: '$500,000',
    tierLead: 'Ставка за вашим бюджетом',
    tiers: ['$1,000–$10,000 · 15%', 'Понад $10,000–$100,000 · 14% → 10%', 'Понад $100,000 · 9% VIP'],
    spend: 'Рекламний спенд', rate: 'Ваша ставка комісії', fee: 'Сума комісії',
    run: 'Запустити з цим бюджетом',
    platformEyebrow: 'ДЕ МИ ПРАЦЮЄМО',
    platformTitle: <>Платформи, з якими <span>ми працюємо</span></>,
    platformSub: 'Агентські акаунти та рішення для роботи з різними рекламними каналами.',
    platformCards: [
      ['Facebook Agency', 'Безлімітний щоденний спенд, високий фактор трасту, відсутність тригерів на холд.'],
      ['Google Ads Invoice', 'Пошук, YouTube та КМС. Плавне машинне навчання, пріоритетна модерація.'],
      ['TikTok & Bing Ads', 'Ексклюзивні вайтліти для швидкого масштабування та високої конверсії.'],
    ],
    comparisonTitle: <>Чому обирають <span>Water Traffic?</span></>,
    comparisonSub: 'Порівняння агентських акаунтів зі звичайними саморегами та фармом.',
    comparisonHeaders: ['Параметр', 'Звичайні самореги / фарм', 'Water Traffic Agency'],
    comparisonRows: [
      ['Добовий ліміт витрат (Daily Spend Limit)', '$50–$250 / день', 'Безліміт ($ Unlimited)'],
      ['Ризик миттєвого блокування при запуску', 'Дуже високий (до 70%)', 'Мінімальний (Пріоритет)'],
      ['Збереження коштів при блокуванні', 'Кошти втрачаються', '100% перенесення залишку'],
      ['Прив’язка платіжних карток', 'Постійний пошук BINів та Risk Payment', 'Надійні агентські картки'],
      ['Швидкість проходження модерації', 'Довгі ручні перевірки', 'Пріоритет (15–60 хвилин)'],
    ],
    infrastructureTitle: <>Повна рекламна <span>інфраструктура</span></>,
    infrastructureSub: 'Інструменти та підтримка навколо рекламних акаунтів.',
    infrastructure: [
      ['01', 'Антидетект-середовище', 'Чисті профілі, повністю оптимізовані під AdsPower та Multilogin.'],
      ['02', 'Резидентські проксі', 'Індивідуальні трастові проксі під геолокацію ваших рекламних акаунтів.'],
      ['03', 'Агентські картки', 'Надійні комерційні картки з високим лімітом для великих біллінгів.'],
      ['04', 'Персональний саппорт 24/7', 'Середній час відповіді менеджера — до 15 хвилин.'],
    ],
    pricingTitle: 'Наша комісія сервісу',
    pricingCopy: 'Гнучка ставка залежно від вашого місячного рекламного бюджету',
    pricingItems: ['Жодних прихованих платежів, щомісячних орендувань чи комісій за вивід', 'Прозора система з нульовим ризиком втрати коштів'],
    pricingCta: 'Почати співпрацю в Telegram',
    paymentHeading: 'Підтримуємо зручні методи оплати та криптовалюту',
    footer: 'Усі права захищені.',
    tierLabel: (budget: number) => budget <= 10000 ? 'До $10,000 включно · ставка 15%' : budget <= 100000 ? 'Понад $10,000 — до $100,000 · ставка 14% → 10%' : 'Понад $100,000 · VIP ставка 9%',
  },
  en: {
    nav: [['calculator', 'Calculator'], ['platforms', 'Platforms'], ['comparison', 'Comparison'], ['infrastructure', 'Infrastructure'], ['pricing', 'Pricing']],
    contact: 'Contact',
    eyebrow: 'INFRASTRUCTURE FOR SCALE',
    heroTitle: <>Run ads<br /><span>without bans &amp; limits</span></>,
    heroCopy: 'Premium high-spend agency ad accounts for media buying and business scaling. Instant replacement upon bans, trusted BINs, and 100% balance protection.',
    accounts: 'Get accounts via Telegram',
    calcCta: 'Calculate budget',
    detail: 'AGENCY ACCOUNTS · PERSONAL SUPPORT',
    diagram: 'ADVERTISING INFRASTRUCTURE',
    sectionCalculator: <>Interactive <span>calculator</span></>,
    sectionSubCalc: 'Estimate the commission against your monthly ad budget. The rate depends on spend.',
    budgetLabel: 'Planned monthly budget',
    minimum: '$1,000', maximum: '$500,000',
    tierLead: 'Rate for your budget',
    tiers: ['$1,000–$10,000 · 15%', 'Over $10,000–$100,000 · 14% → 10%', 'Over $100,000 · 9% VIP'],
    spend: 'Ad spend', rate: 'Your fee rate', fee: 'Total fee',
    run: 'Launch with this budget',
    platformEyebrow: 'WHERE WE WORK',
    platformTitle: <>Platforms <span>we work with</span></>,
    platformSub: 'Agency accounts and solutions for working across advertising channels.',
    platformCards: [
      ['Facebook Agency', 'Unlimited daily spend, strong trust scores, no hold triggers.'],
      ['Google Ads Invoice', 'Search, YouTube & GDN. Smooth machine learning, priority moderation.'],
      ['TikTok & Bing Ads', 'Exclusive whitelists for rapid scaling and high conversion.'],
    ],
    comparisonTitle: <>Why choose <span>Water Traffic?</span></>,
    comparisonSub: 'A comparison of agency accounts with regular self-registrations and farmed accounts.',
    comparisonHeaders: ['Parameter', 'Regular self-regs / farm', 'Water Traffic Agency'],
    comparisonRows: [
      ['Daily Spend Limit', '$50–$250 / day', 'Unlimited ($ Unlimited)'],
      ['Initial Ban Risk', 'Very high (up to 70%)', 'Minimal (Priority)'],
      ['Balance Protection on Ban', 'Funds are lost', '100% balance transfer'],
      ['Payment Card Linking', 'Constant search for BINs & Risk Payment', 'Reliable agency cards'],
      ['Moderation Speed', 'Long manual reviews', 'Priority (15–60 minutes)'],
    ],
    infrastructureTitle: <>Full ad <span>infrastructure</span></>,
    infrastructureSub: 'Tools and support around your advertising accounts.',
    infrastructure: [
      ['01', 'Anti-detect environment', 'Clean profiles fully optimized for AdsPower and Multilogin.'],
      ['02', 'Residential proxies', 'Individual trusted proxies matching your account geolocations.'],
      ['03', 'Agency cards', 'Trusted commercial cards with high limits for large billing.'],
      ['04', '24/7 personal support', 'Average manager response time is up to 15 minutes.'],
    ],
    pricingTitle: 'Our service fee',
    pricingCopy: 'Flexible rate based on your monthly advertising budget',
    pricingItems: ['No hidden fees, monthly rentals, or withdrawal charges', 'Transparent system with zero risk of fund loss'],
    pricingCta: 'Start cooperation via Telegram',
    paymentHeading: 'Supported payment methods & crypto',
    footer: 'All rights reserved.',
    tierLabel: (budget: number) => budget <= 10000 ? 'Up to $10,000 inclusive · 15% rate' : budget <= 100000 ? 'Over $10,000 through $100,000 · 14% → 10% rate' : 'Over $100,000 · 9% VIP rate',
  },
} as const;

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Water Traffic home" data-testid="link-brand">
      <svg className="wave" viewBox="0 0 30 28" aria-hidden="true">
        <path d="M1 10c3.1 0 3.1-4 6.2-4s3.1 4 6.2 4 3.1-4 6.2-4 3.1 4 6.2 4 3.1-4 6.2-4" />
        <path d="M1 19c3.1 0 3.1-4 6.2-4s3.1 4 6.2 4 3.1-4 6.2-4 3.1 4 6.2 4 3.1-4 6.2-4" />
      </svg>
      <span>WATER<em>TRAFFIC</em></span>
    </a>
  );
}

function HeroArtwork({ label }: { label: string }) {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="orbit"><span className="orbit-label">{label}</span></div>
      <span className="float-tag tag-one">META · GOOGLE</span>
      <span className="float-tag tag-two">TIKTOK · BING</span>
      <svg viewBox="0 0 390 270" width="88%" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="water-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#43d8dc" stopOpacity=".24" />
            <stop offset="1" stopColor="#43d8dc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M13 89 C71 35 103 138 162 93 S257 42 294 90 S353 139 382 75" fill="none" stroke="#43d8dc" strokeOpacity=".18" strokeWidth="1" />
        <path d="M9 119 C66 67 103 161 162 120 S256 69 300 117 S357 162 383 102" fill="none" stroke="#43d8dc" strokeOpacity=".34" strokeWidth="1.3" />
        <path d="M8 149 C62 99 105 185 161 147 S258 96 299 144 S355 190 382 131" fill="none" stroke="#43d8dc" strokeOpacity=".6" strokeWidth="1.7" />
        <path d="M15 178 C75 132 106 213 165 177 S258 124 305 171 S354 217 377 161" fill="none" stroke="#43d8dc" strokeOpacity=".25" strokeWidth="1.2" />
        <circle cx="161" cy="147" r="5" fill="#c4ffff" /><circle cx="161" cy="147" r="13" fill="none" stroke="#43d8dc" strokeOpacity=".35" />
        <circle cx="299" cy="144" r="4" fill="#c4ffff" /><circle cx="299" cy="144" r="11" fill="none" stroke="#43d8dc" strokeOpacity=".3" />
        <circle cx="69" cy="113" r="3" fill="#43d8dc" />
        <path d="M11 226H379" stroke="#8db9bc" strokeOpacity=".2" strokeDasharray="3 7" />
        <path d="M55 215v11m109-11v11m137-11v11" stroke="#8db9bc" strokeOpacity=".28" />
      </svg>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('selectedLang');
      return saved === 'en' ? 'en' : 'ua';
    } catch {
      return 'ua';
    }
  });
  const [budget, setBudget] = useState(15000);
  const t = words[language];
  const calculation = useMemo(() => {
    let rate: number;
    if (budget <= 10000) rate = 15;
    else if (budget <= 100000) rate = 14 - ((budget - 10000) / 90000) * 4;
    else rate = 9;
    const roundedRate = Number(rate.toFixed(1));
    return { rate: roundedRate, fee: Math.round(budget * roundedRate / 100) };
  }, [budget]);
  const selectedPreset = PRESETS.includes(budget) ? budget : null;
  const progress = `${((budget - 1000) / (500000 - 1000)) * 100}%`;

  useEffect(() => {
    document.documentElement.lang = language === 'ua' ? 'uk' : 'en';
    try { localStorage.setItem('selectedLang', language); } catch { /* Storage may be disabled. */ }
  }, [language]);

  return (
    <main className="site" id="top">
      <header className="topbar">
        <div className="wrap nav">
          <Brand />
          <nav className="navlinks" aria-label={language === 'ua' ? 'Основна навігація' : 'Main navigation'}>
            {t.nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="navright">
            <div className="language" aria-label={language === 'ua' ? 'Мова' : 'Language'}>
              <button type="button" className={language === 'ua' ? 'active' : ''} onClick={() => setLanguage('ua')} aria-pressed={language === 'ua'} data-testid="button-language-ua">UA</button>
              <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'} data-testid="button-language-en">EN</button>
            </div>
            <a className="button button-primary small-button" href={CONTACT} target="_blank" rel="noreferrer">{t.contact}<ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="reveal">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={CONTACT} target="_blank" rel="noreferrer">{t.accounts}<ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="button button-quiet" href="#calculator">{t.calcCta}<ArrowDownRight size={15} aria-hidden="true" /></a>
            </div>
            <div className="hero-foot"><span className="live-dot" />{t.detail}</div>
          </div>
          <div className="reveal reveal-delay"><HeroArtwork label={t.diagram} /></div>
        </div>
      </section>
      <div className="band">
        <div className="wrap band-inner">
          <span className="band-note">{t.platformEyebrow}</span>
          <div className="platform-names" aria-label={language === 'ua' ? 'Рекламні платформи' : 'Advertising platforms'}>
            <span>Facebook</span><span>Google Ads</span><span>TikTok</span><span>Bing</span>
          </div>
        </div>
      </div>
      <section className="section" id="calculator">
        <div className="wrap">
          <div className="section-heading">
            <h2 className="section-title">{t.sectionCalculator}</h2>
            <p className="section-sub">{t.sectionSubCalc}</p>
          </div>
          <div className="calc-shell">
            <div className="calc-topline">
              <label htmlFor="budget-slider">{t.budgetLabel} ($)</label>
              <output className="budget" htmlFor="budget-slider" data-testid="text-budget">${budget.toLocaleString('en-US')}</output>
            </div>
            <input
              className="slider"
              id="budget-slider"
              type="range"
              min={1000}
              max={500000}
              step={1000}
              value={budget}
              onChange={(event) => setBudget(Number(event.currentTarget.value))}
              style={{ '--progress': progress } as CSSProperties}
              aria-label={t.budgetLabel}
              aria-valuetext={money(budget)}
              data-testid="input-budget-slider"
            />
            <div className="slider-caps"><span>{t.minimum}</span><span>{t.maximum}</span></div>
            <div className="presets" aria-label={language === 'ua' ? 'Швидкий вибір бюджету' : 'Budget presets'}>
              {PRESETS.map((preset) => (
                <button key={preset} type="button" className={`preset ${selectedPreset === preset ? 'selected' : ''}`} onClick={() => setBudget(preset)} aria-pressed={selectedPreset === preset} data-testid={`button-budget-${preset}`}>
                  {preset >= 1000 ? `$${preset / 1000}k` : money(preset)}
                </button>
              ))}
            </div>
            <div className="tier-summary" aria-label={language === 'ua' ? 'Градація комісії Water Traffic' : 'Water Traffic commission tiers'}>
              {t.tiers.map((tier) => <span key={tier}>{tier}</span>)}
            </div>
            <div className="tier"><span>{t.tierLead}</span><strong data-testid="text-tier">{t.tierLabel(budget)}</strong></div>
            <div className="results" aria-live="polite">
              <div className="result"><div className="result-label">{t.spend}</div><div className="result-value" data-testid="text-spend">{money(budget)}</div></div>
              <div className="result"><div className="result-label">{t.rate}</div><div className="result-value" data-testid="text-rate">{calculation.rate.toFixed(1)}%</div></div>
              <div className="result"><div className="result-label">{t.fee}</div><div className="result-value" data-testid="text-fee">{money(calculation.fee)}</div></div>
            </div>
            <div className="calc-cta"><p>{t.pricingCopy}</p><a className="button button-primary" href={CONTACT} target="_blank" rel="noreferrer">{t.run}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>
      <section className="section section-tint" id="platforms">
        <div className="wrap">
          <div className="section-heading">
            <div><p className="eyebrow">{t.platformEyebrow}</p><h2 className="section-title">{t.platformTitle}</h2></div>
            <p className="section-sub">{t.platformSub}</p>
          </div>
          <div className="platform-grid">
            {t.platformCards.map(([title, description], index) => <article className="platform-card" key={title}>
              <span className="card-index">0{index + 1} / CHANNEL</span><h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
        </div>
      </section>
      <section className="section" id="comparison">
        <div className="wrap">
          <div className="section-heading">
            <div><p className="eyebrow">{language === 'ua' ? 'ПОРІВНЯННЯ' : 'COMPARISON'}</p><h2 className="section-title">{t.comparisonTitle}</h2></div>
            <p className="section-sub">{t.comparisonSub}</p>
          </div>
          <div className="compare" role="table" aria-label={language === 'ua' ? 'Порівняння рекламних акаунтів' : 'Ad account comparison'}>
            <div className="compare-head" role="row">{t.comparisonHeaders.map((heading) => <div role="columnheader" key={heading}>{heading}</div>)}</div>
            {t.comparisonRows.map(([metric, regular, agency]) => (
              <div className="compare-row" role="row" key={metric}>
                <div role="cell">{metric}</div>
                <div role="cell" data-label={t.comparisonHeaders[1]}><span className="comparison-claim"><span className="claim-mark claim-no" aria-hidden="true"><X size={11} /></span>{regular}</span></div>
                <div role="cell" data-label={t.comparisonHeaders[2]}><span className="comparison-claim"><span className="claim-mark claim-yes" aria-hidden="true"><Check size={11} /></span>{agency}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint" id="infrastructure">
        <div className="wrap">
          <div className="section-heading">
            <div><p className="eyebrow">{language === 'ua' ? 'ПІДТРИМКА КАМПАНІЙ' : 'CAMPAIGN SUPPORT'}</p><h2 className="section-title">{t.infrastructureTitle}</h2></div>
            <p className="section-sub">{t.infrastructureSub}</p>
          </div>
          <div className="infra-grid">
            {t.infrastructure.map(([number, title, description]) => <article className="infra-item" key={number}>
              <span className="infra-mark">{number}</span><div><h3>{title}</h3><p>{description}</p></div>
            </article>)}
          </div>
        </div>
      </section>
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="pricing">
            <div><p className="eyebrow">{language === 'ua' ? 'ПРОЗОРІ УМОВИ' : 'CLEAR TERMS'}</p><h2 className="price-label">{t.pricingTitle}</h2><div className="price">9%–15%</div><p className="price-desc">{t.pricingCopy}</p></div>
            <div><ul className="price-list">{t.pricingItems.map((item) => <li key={item}><Check className="check" size={16} aria-hidden="true" />{item}</li>)}</ul><a className="button button-primary" href={CONTACT} target="_blank" rel="noreferrer">{t.pricingCta}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>
      <section className="section section-tint" aria-label={language === 'ua' ? 'Як почати' : 'How to start'}>
        <div className="wrap">
          <div className="section-heading">
            <div><p className="eyebrow">{language === 'ua' ? 'НАСТУПНИЙ КРОК' : 'NEXT STEP'}</p><h2 className="section-title">{language === 'ua' ? <>Почніть розмову<br /><span>в Telegram</span></> : <>Start a conversation<br /><span>on Telegram</span></>}</h2></div>
            <a className="button button-primary" href={CONTACT} target="_blank" rel="noreferrer">{t.contact}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="steps">
            {(language === 'ua'
              ? [['01', 'Опишіть задачу', 'Розкажіть менеджеру про рекламні платформи та бюджет.'], ['02', 'Узгодьте умови', 'Обговоріть акаунти, інфраструктуру та ставку для вашого бюджету.'], ['03', 'Почніть роботу', 'Зв’яжіться з командою, щоб обговорити запуск.']]
              : [['01', 'Share your brief', 'Tell the manager about your advertising platforms and budget.'], ['02', 'Confirm the details', 'Discuss accounts, infrastructure, and the rate for your budget.'], ['03', 'Get started', 'Connect with the team to discuss your launch.']]
            ).map(([number, title, body]) => <article className="step" key={number}><span className="step-no">{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>
      <section className="payments">
        <div className="wrap">
          <h2 className="payments-head">{t.paymentHeading}</h2>
          <div className="payment-list">{['USDT (TRC-20 / ERC-20)', 'Binance Pay', 'Bybit Pay', 'Capitalist', 'Wire Transfer (SWIFT/SEPA)'].map((method) => <span className="payment" key={method}>{method}</span>)}</div>
        </div>
      </section>
      <footer className="wrap footer">
        <span>© 2026 Water Traffic Agency. {t.footer}</span>
        <a href={CONTACT} target="_blank" rel="noreferrer">Telegram <ArrowUpRight size={12} aria-hidden="true" /></a>
      </footer>
    </main>
  );
}

export default App;