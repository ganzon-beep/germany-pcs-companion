const journeyStages = [
  ['01', 'Temporary offer', 'Understand what comes next'],
  ['02', 'Final offer', 'Prepare with confidence'],
  ['03', 'Pre-arrival', 'Make the move feel manageable'],
  ['04', 'Arrival', 'Handle the first essentials'],
  ['05', '30 · 60 · 90', 'Settle into life in Germany'],
]

const companionPaths = [
  {
    eyebrow: 'Your new workplace',
    title: 'Discover LRMC',
    copy: 'Meet the organization, understand your first days, and feel connected before you arrive.',
    link: 'Explore LRMC',
    className: 'path-card--sky',
  },
  {
    eyebrow: 'Your relocation',
    title: 'Move with clarity',
    copy: 'Turn offers, orders, documents, travel, housing, and allowances into a clear next step.',
    link: 'See your PCS journey',
    className: 'path-card--sand',
  },
  {
    eyebrow: 'Your everyday life',
    title: 'Feel at home sooner',
    copy: 'Learn how healthcare, schools, driving, utilities, and daily life work in Germany.',
    link: 'Explore life in Germany',
    className: 'path-card--sage',
  },
]

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LRMC PCS Companion home">
          <span className="brand-mark">L</span>
          <span className="brand-copy">
            <strong>LRMC</strong>
            <span>PCS Companion</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#journey">Your journey</a>
          <a href="#explore">Explore</a>
          <a href="#command">About LRMC</a>
        </nav>

        <a className="header-action" href="#journey">
          Find my next step
          <span aria-hidden="true">→</span>
        </a>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Your move to Landstuhl, made clearer
            </p>
            <h1>
              From job offer to
              <span>feeling at home.</span>
            </h1>
            <p className="hero-lede">
              We’re excited to welcome you to the LRMC family and support you
              through every step of your overseas PCS. Whether you’re preparing
              to move, getting ready to arrive, or settling into your new home
              in Germany, the LRMC PCS Companion will help you understand what
              to expect and what to do next.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#journey">
                Start my journey
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#explore">
                Explore life at LRMC
                <ArrowIcon />
              </a>
            </div>
            <p className="privacy-note">
              <span>No account required</span>
              <span className="privacy-note__dot" aria-hidden="true">•</span>
              <span>Your progress stays on your device</span>
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="/images/lrmc-aerial.jpg"
                alt="Aerial view of the Landstuhl Regional Medical Center campus"
              />
              <div className="hero-image-caption">
                <span>Landstuhl, Germany</span>
                <strong>Your new chapter starts here.</strong>
              </div>
            </div>
            <div className="arrival-card">
              <span className="arrival-card__label">Built around you</span>
              <strong>One clear next step</strong>
              <p>at every stage of your move.</p>
            </div>
          </div>
        </section>

        <section className="journey section-pad" id="journey">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your path, at your pace</p>
              <h2>We’ll meet you where you are.</h2>
            </div>
            <p>
              Tell us where you are in the process and the Companion will shape
              what you see—so you can focus on today without losing sight of
              what’s ahead.
            </p>
          </div>

          <ol className="journey-track">
            {journeyStages.map(([number, title, copy], index) => (
              <li key={title} className={index === 0 ? 'is-active' : ''}>
                <span className="stage-number">{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <a className="journey-prompt" href="#explore">
            <span className="journey-prompt__number">01</span>
            <span>
              <small>Start here</small>
              <strong>I’ve received my temporary job offer</strong>
            </span>
            <span className="journey-prompt__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </section>

        <section className="explore section-pad" id="explore">
          <div className="section-heading section-heading--center">
            <div>
              <p className="eyebrow">More than a checklist</p>
              <h2>Everything around the move.</h2>
            </div>
            <p>
              Practical guidance for the work, the relocation, and the life
              you’re building here.
            </p>
          </div>

          <div className="path-grid">
            {companionPaths.map((path) => (
              <article className={`path-card ${path.className}`} key={path.title}>
                <p className="path-card__eyebrow">{path.eyebrow}</p>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <a href="#journey">
                  {path.link}
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="command section-pad" id="command">
          <div className="command-image">
            <img
              src="/images/commander-stewart.jpg"
              alt="Official portrait of the LRMC commander"
            />
          </div>
          <div className="command-copy">
            <p className="eyebrow">Welcome to LRMC</p>
            <blockquote>
              “You are the institutional memory, the consistent expertise, and
              the heart of LRMC.”
            </blockquote>
            <p>
              Our civilian employees and local nationals are essential to
              LRMC’s success and to the care we provide.
            </p>
            <a className="text-link" href="#top">
              Read the command philosophy
              <ArrowIcon />
            </a>
            <div className="command-attribution">
              <strong>Colonel Warren A. Stewart</strong>
              <span>
                Commander/Director, Landstuhl Regional Medical Center
              </span>
            </div>
          </div>
        </section>

        <section className="closing section-pad">
          <img
            src="/images/lrmc-entrance.jpg"
            alt="Entrance to Landstuhl Regional Medical Center"
          />
          <div className="closing-overlay" />
          <div className="closing-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>A more confident move starts with one clear next step.</h2>
            <a className="button button--light" href="#journey">
              Build my arrival plan
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">L</span>
          <span className="brand-copy">
            <strong>LRMC</strong>
            <span>PCS Companion</span>
          </span>
        </a>
        <p>From job offer to settled in Germany.</p>
        <div className="footer-links">
          <a href="#top">Accessibility</a>
          <a href="#top">Privacy</a>
          <a href="#top">About this guide</a>
        </div>
      </footer>
    </div>
  )
}

export default App
