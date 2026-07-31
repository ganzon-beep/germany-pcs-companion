import { useEffect, useState } from 'react'

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
    title: 'Connect with your LRMC sponsor',
    detail: 'Share your arrival plan and ask about your first duty day, local access, and temporary lodging.',
    tag: 'LRMC',
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
    title: 'Complete CAC and SOFA processing',
    detail: 'Bring your orders, passport, and identification. Your sponsor can confirm the best current location.',
    tag: 'Priority',
  },
  {
    id: 'license',
    phase: 'Arrival',
    window: 'First week',
    title: 'Begin USAREUR driver licensing',
    detail: 'Complete the required training and bring hard-copy orders and your valid state license.',
    tag: 'Driving',
  },
  {
    id: 'tqsa',
    phase: '30 · 60 · 90',
    window: 'Every 30 days',
    title: 'Submit your TQSA reimbursement',
    detail: 'Organize all lodging, meal, and laundry receipts and submit in 30-day increments.',
    tag: 'Deadline',
  },
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

function Companion({ onHome }) {
  const [activePhase, setActivePhase] = useState('Temporary offer')
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lrmc-pcs-progress')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('lrmc-pcs-progress', JSON.stringify(completed))
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
        <button className="brand brand-button" onClick={onHome} aria-label="Return to LRMC PCS Companion home">
          <span className="brand-mark">L</span>
          <span className="brand-copy">
            <strong>LRMC</strong>
            <span>PCS Companion</span>
          </span>
        </button>
        <p>Your private arrival plan</p>
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
            <p><strong>Use this as a planning companion.</strong> Confirm appointments, locations, eligibility, and current policy with your HR team or sponsor before acting.</p>
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
              <button className="button button--primary" onClick={startPlan}>
                Start my journey
                <span aria-hidden="true">→</span>
              </button>
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
            <button className="button button--light" onClick={startPlan}>
              Build my arrival plan
              <span aria-hidden="true">→</span>
            </button>
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
