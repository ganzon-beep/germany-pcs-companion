import { useEffect, useState } from 'react'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const journeyStages = [
  ['01', 'Temporary offer', 'Understand what comes next'],
  ['02', 'Final offer', 'Prepare with confidence'],
  ['03', 'Pre-arrival', 'Make the move feel manageable'],
  ['04', 'Arrival', 'Handle the first essentials'],
  ['05', '30 · 60 · 90', 'Settle into life in Germany'],
]

const phaseTasks = [
  {
    id: 'temporary-offer',
    phase: 'Temporary offer',
    window: 'Start here',
    title: 'Review your tentative offer',
    detail: 'Confirm the position, duty location, grade, and the HR contact listed in your offer.',
    tag: 'Offer',
  },
  {
    id: 'documents',
    phase: 'Temporary offer',
    window: 'This week',
    title: 'Start your PCS document folder',
    detail: 'Keep your offer, passports, marriage or birth certificates, pet records, and receipts together.',
    tag: 'Documents',
  },
  {
    id: 'final-offer',
    phase: 'Final offer',
    window: 'When received',
    title: 'Verify your final offer and travel orders',
    detail: 'Check names, dependents, allowances, and the authorized travel details before booking.',
    tag: 'Orders',
  },
  {
    id: 'sponsor',
    phase: 'Pre-arrival',
    window: '60–30 days out',
    title: 'Connect with your relocation contact',
    detail: 'Share your arrival plan and ask about your first workday, local requirements, and temporary lodging.',
    tag: 'Contact',
  },
  {
    id: 'lodging',
    phase: 'Pre-arrival',
    window: '60–30 days out',
    title: 'Reserve temporary lodging',
    detail: 'Book early, confirm pet restrictions, and keep every lodging and meal receipt for TQSA.',
    tag: 'Housing',
  },
  {
    id: 'cac-sofa',
    phase: 'Arrival',
    window: 'First 48 hours',
    title: 'Confirm your arrival documents',
    detail: 'Bring your travel documents, passport, and identification. Your relocation contact can confirm current requirements.',
    tag: 'Arrival',
  },
  {
    id: 'license',
    phase: 'Arrival',
    window: 'First week',
    title: 'Review driving requirements in Germany',
    detail: 'Confirm which training, documents, license conversions, and insurance rules apply to your situation.',
    tag: 'Driving',
  },
  {
    id: 'tqsa',
    phase: '30 · 60 · 90',
    window: 'Every 30 days',
    title: 'Submit your temporary-lodging claim',
    detail: 'Organize all lodging, meal, and laundry receipts and follow the reimbursement schedule in your relocation paperwork.',
    tag: 'Deadline',
  },
]

const companionPaths = [
  {
    eyebrow: 'Your new beginning',
    title: 'Arrive prepared',
    copy: 'Understand your first days, organize the essentials, and feel more grounded before you arrive.',
    link: 'Plan your arrival',
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

function Companion({ onHome }) {
  const [activePhase, setActivePhase] = useState('Temporary offer')
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('germany-pcs-progress')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('germany-pcs-progress', JSON.stringify(completed))
  }, [completed])

  const visibleTasks = phaseTasks.filter((task) => task.phase === activePhase)
  const completion = Math.round((completed.length / phaseTasks.length) * 100)

  const toggleTask = (id) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id],
    )
  }

  return (
    <div className="companion-shell">
      <header className="companion-header">
        <button className="brand brand-button" onClick={onHome} aria-label="Return to Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </button>
        <p>Your personal arrival plan</p>
        <button className="home-link" onClick={onHome}>Exit plan</button>
      </header>

      <main className="planner">
        <aside className="planner-sidebar">
          <p className="eyebrow">Your journey</p>
          <h2>One move.<br />One step at a time.</h2>
          <div className="progress-card">
            <div>
              <span>Overall progress</span>
              <strong>{completion}%</strong>
            </div>
            <div className="progress-bar" aria-label={`${completion}% complete`}>
              <span style={{ width: `${completion}%` }} />
            </div>
            <small>{completed.length} of {phaseTasks.length} essential steps complete</small>
          </div>
          <p className="device-note">Your checkmarks are saved only on this device.</p>
        </aside>

        <section className="planner-main">
          <div className="planner-intro">
            <div>
              <p className="eyebrow">Your personalized roadmap</p>
              <h1>Where are you<br /><span>right now?</span></h1>
            </div>
            <p>Choose the stage that matches your move. We’ll keep the immediate tasks in focus while your full plan stays close at hand.</p>
          </div>

          <div className="phase-tabs" role="tablist" aria-label="PCS journey stage">
            {journeyStages.map(([number, title]) => (
              <button
                key={title}
                className={activePhase === title ? 'is-active' : ''}
                onClick={() => setActivePhase(title)}
                role="tab"
                aria-selected={activePhase === title}
              >
                <span>{number}</span>
                {title}
              </button>
            ))}
          </div>

          <div className="task-heading">
            <div>
              <p className="eyebrow">Focus now</p>
              <h2>{activePhase}</h2>
            </div>
            <span>{visibleTasks.length} essential {visibleTasks.length === 1 ? 'step' : 'steps'}</span>
          </div>

          <div className="task-list">
            {visibleTasks.map((task) => {
              const isDone = completed.includes(task.id)
              return (
                <article className={`task-card ${isDone ? 'is-done' : ''}`} key={task.id}>
                  <button
                    className="task-check"
                    onClick={() => toggleTask(task.id)}
                    aria-label={`${isDone ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
                    aria-pressed={isDone}
                  >
                    {isDone ? '✓' : ''}
                  </button>
                  <div>
                    <div className="task-meta">
                      <span>{task.window}</span>
                      <span>{task.tag}</span>
                    </div>
                    <h3>{task.title}</h3>
                    <p>{task.detail}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="planner-reassurance">
            <span aria-hidden="true">i</span>
            <p><strong>Unofficial testing guide.</strong> This site is not affiliated with any government agency, installation, base, unit, or employer. Confirm requirements with your authorized relocation or HR contact before acting.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  const [showCompanion, setShowCompanion] = useState(() => window.location.hash === '#plan')

  useEffect(() => {
    const handleHash = () => setShowCompanion(window.location.hash === '#plan')
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const startPlan = () => {
    window.location.hash = 'plan'
    setShowCompanion(true)
  }

  const returnHome = () => {
    window.history.pushState(null, '', window.location.pathname)
    setShowCompanion(false)
    window.scrollTo(0, 0)
  }

  if (showCompanion) {
    return <Companion onHome={returnHome} />
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#journey">Your journey</a>
          <a href="#explore">Explore</a>
          <a href="#about">About this guide</a>
        </nav>

        <button className="header-action" onClick={startPlan}>
          Find my next step
          <span aria-hidden="true">→</span>
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Welcome to the U.S.–German family
            </p>
            <h1>
              Your move to Germany,
              <span>made clearer.</span>
            </h1>
            <p className="hero-lede">
              The Germany PCS Companion brings the details of an overseas move
              into one calm, step-by-step experience—from your first job offer
              through arrival and your first 90 days at home in Germany.
            </p>
            <div className="hero-actions">
              <button className="button button--primary" onClick={startPlan}>
                Start my journey
                <span aria-hidden="true">→</span>
              </button>
              <a className="text-link" href="#explore">
                Explore life in Germany
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
                src={assetUrl('/images/germany-landscape.jpg')}
                alt="Aerial view of a green community in Germany"
              />
              <div className="hero-image-caption">
                <span>Germany</span>
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

          <button className="journey-prompt" onClick={startPlan}>
            <span className="journey-prompt__number">01</span>
            <span>
              <small>Start here</small>
              <strong>I’ve received my temporary job offer</strong>
            </span>
            <span className="journey-prompt__arrow" aria-hidden="true">
              →
            </span>
          </button>
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

        <section className="welcome section-pad" id="about">
          <div className="welcome-image">
            <img
              src={assetUrl('/images/german-shepherd-welcome.png')}
              alt="A happy illustrated German shepherd beside a German home"
            />
          </div>
          <div className="welcome-copy">
            <p className="eyebrow">A friendly guide for the whole transition</p>
            <blockquote>“A new country feels closer when you know what comes next.”</blockquote>
            <p>
              Use this companion from your first offer through your first 90
              days in Germany. We’ll keep each immediate step visible while
              helping you settle into the rhythms of your new home.
            </p>
            <button className="text-link" onClick={startPlan}>
              Open my arrival plan
              <ArrowIcon />
            </button>
            <div className="testing-notice">
              <strong>Public testing edition</strong>
              <span>
                Unofficial and unaffiliated with any government agency, base,
                installation, unit, organization, or employer.
              </span>
            </div>
          </div>
        </section>

        <section className="closing section-pad">
          <img
            src={assetUrl('/images/germany-landscape.jpg')}
            alt="Green landscape and buildings in Germany"
          />
          <div className="closing-overlay" />
          <div className="closing-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>A more confident move starts with one clear next step.</h2>
            <button className="button button--light" onClick={startPlan}>
              Build my arrival plan
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </a>
        <p>From job offer to settled in Germany.</p>
        <div className="footer-links">
          <a href="#top">Accessibility</a>
          <a href="#top">Privacy</a>
          <a href="#about">Testing disclaimer</a>
        </div>
      </footer>
    </div>
  )
}

export default App
