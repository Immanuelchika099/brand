import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import XLogo from './XLogo';
import { contact } from '../data/content';
import './StartProject.css';

const steps = [
  {
    eyebrow: '01 / THE PROJECT',
    title: 'What are you looking to create?',
    hint: 'Select all that apply.',
    type: 'multiple',
    field: 'services',
    options: ['Website design', 'Web development', 'Brand identity', 'UI/UX design', 'Something else'],
  },
  {
    eyebrow: '02 / THE GOAL',
    title: 'What’s the main goal?',
    type: 'single',
    field: 'goal',
    options: ['Launch something new', 'Grow my business', 'Build a stronger brand', 'Improve an existing product', 'Bring an idea to life'],
  },
  {
    eyebrow: '03 / THE STAGE',
    title: 'Where are you with the idea?',
    type: 'single',
    field: 'stage',
    options: ['I have a clear brief', 'I have an idea to explore', 'I’m still figuring it out', 'I have an existing project'],
  },
  {
    eyebrow: '04 / THE TIMELINE',
    title: 'When would you like to get started?',
    type: 'single',
    field: 'timeline',
    options: ['As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring for now'],
  },
];

const initialForm = {
  services: [],
  goal: '',
  stage: '',
  timeline: '',
  name: '',
  email: '',
  message: '',
};

export default function StartProject() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const current = steps[step];
  const isContactStep = step === steps.length;
  const canContinue = isContactStep
    ? Boolean(form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    : current.type === 'multiple'
      ? form[current.field].length > 0
      : Boolean(form[current.field]);

  function choose(option) {
    if (current.type === 'multiple') {
      setForm(value => ({
        ...value,
        services: value.services.includes(option)
          ? value.services.filter(item => item !== option)
          : [...value.services, option],
      }));
      return;
    }
    setForm(value => ({ ...value, [current.field]: option }));
  }

  function update(event) {
    setForm(value => ({ ...value, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!canContinue) return;

    const subject = encodeURIComponent('Project enquiry — ' + form.name);
    const body = encodeURIComponent(
      'Name: ' + form.name +
      '\nEmail: ' + form.email +
      '\nWhat I need: ' + form.services.join(', ') +
      '\nMain goal: ' + form.goal +
      '\nProject stage: ' + form.stage +
      '\nTimeline: ' + form.timeline +
      '\n\nProject notes: ' + (form.message || 'Not provided')
    );

    setSubmitted(true);
    window.location.href = 'mailto:' + contact.email + '?subject=' + subject + '&body=' + body;
  }

  function next() {
    if (canContinue) setStep(value => Math.min(value + 1, steps.length));
  }

  return (
    <main className="start-project-page">
      <header className="project-nav">
        <a href="/" className="project-nav__brand" aria-label="Dezigner X home"><XLogo /></a>
        <a href="/" className="project-nav__back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</a>
      </header>

      <section className="project-flow">
        <div className="project-flow__topline">
          <span>DEZIGNER X <i>/</i> PROJECT ENQUIRY</span>
          {!submitted && <span>{step + 1} / {steps.length + 1}</span>}
        </div>

        {submitted ? (
          <div className="project-success" aria-live="polite">
            <span className="project-success__check"><Check size={24} /></span>
            <span className="project-eyebrow">ENQUIRY READY</span>
            <h1>LET’S MAKE<br /><em>IT HAPPEN.</em></h1>
            <p>Your email app should open with your project details.</p>
            <a href="/" className="project-flow__back-link"><ArrowLeft size={16} /> BACK TO PORTFOLIO</a>
          </div>
        ) : (
          <>
            <div className="project-progress" aria-label={'Step ' + (step + 1) + ' of ' + (steps.length + 1)}>
              <span style={{ width: ((step + 1) / (steps.length + 1)) * 100 + '%' }} />
            </div>

            <div className="project-flow__body" key={step}>
              <span className="project-eyebrow">{isContactStep ? '05 / YOUR DETAILS' : current.eyebrow}</span>
              <h1>{isContactStep ? <>Where can I<br /><em>reach you?</em></> : current.title}</h1>

              {isContactStep ? (
                <form className="project-flow__form" onSubmit={submit}>
                  <label>
                    <span>Your name</span>
                    <input name="name" value={form.name} onChange={update} placeholder="Full name" autoComplete="name" required />
                  </label>
                  <label>
                    <span>Email address</span>
                    <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required />
                  </label>
                  <label>
                    <span>Anything else? <small>OPTIONAL</small></span>
                    <textarea name="message" value={form.message} onChange={update} placeholder="A few details about your project..." rows="3" />
                  </label>
                  <button className="project-flow__continue" type="submit" disabled={!canContinue}>
                    SEND ENQUIRY <ArrowUpRight size={18} />
                  </button>
                </form>
              ) : (
                <>
                  {current.hint && <p className="project-flow__hint">{current.hint}</p>}
                  <div className="project-options">
                    {current.options.map((option) => {
                      const selected = current.type === 'multiple'
                        ? form[current.field].includes(option)
                        : form[current.field] === option;
                      return (
                        <button
                          className={'project-option' + (selected ? ' is-selected' : '')}
                          type="button"
                          key={option}
                          onClick={() => choose(option)}
                          aria-pressed={selected}
                        >
                          <span>{option}</span>
                          <span className="project-option__indicator">{selected && <Check size={14} />}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {!isContactStep && (
              <div className="project-flow__controls">
                <button className="project-flow__back" type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>
                  <ArrowLeft size={16} /> BACK
                </button>
                <button className="project-flow__continue" type="button" onClick={next} disabled={!canContinue}>
                  CONTINUE <ArrowRight size={17} />
                </button>
              </div>
            )}
            {isContactStep && (
              <div className="project-flow__controls project-flow__controls--form">
                <button className="project-flow__back" type="button" onClick={() => setStep(steps.length - 1)}>
                  <ArrowLeft size={16} /> BACK
                </button>
                <span>YOUR DETAILS STAY PRIVATE.</span>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="project-footer">
        <a href="/" className="project-footer__brand"><XLogo small /><span>DEZIGNER X</span></a>
        <span>CREATIVE DESIGNER · DIGITAL EXPERIENCES</span>
        <a href="/" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
