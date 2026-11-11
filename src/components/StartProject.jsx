import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import XLogo from './XLogo';
import { contact } from '../data/content';
import './StartProject.css';

const steps = [
  {
    eyebrow: '01 / THE PROJECT',
    title: 'What do you need?',
    subtitle: 'Choose what best describes your project.',
    type: 'single',
    key: 'service',
    options: ['Website design', 'Brand identity', 'UI/UX design', 'Creative development', 'Something else'],
  },
  {
    eyebrow: '02 / THE GOAL',
    title: 'What’s the main goal?',
    subtitle: 'Select all that apply.',
    type: 'multiple',
    key: 'goals',
    options: ['Launch something new', 'Grow my business', 'Build a stronger brand', 'Improve an existing product', 'Bring an idea to life'],
  },
  {
    eyebrow: '03 / THE STAGE',
    title: 'Where are you right now?',
    subtitle: 'There’s no wrong answer.',
    type: 'single',
    key: 'stage',
    options: ['I have a clear plan', 'I have an idea to explore', 'I need help figuring it out', 'I’m improving something existing'],
  },
  {
    eyebrow: '04 / THE TIMELINE',
    title: 'When would you like to start?',
    subtitle: 'A rough estimate is perfect.',
    type: 'single',
    key: 'timeline',
    options: ['As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring for now'],
  },
];

const initialAnswers = { service: '', goals: [], stage: '', timeline: '', name: '', email: '', details: '' };

export default function StartProject() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const current = steps[step];
  const isContactStep = step === steps.length;

  function choose(value) {
    if (current.type === 'multiple') {
      setAnswers(previous => ({
        ...previous,
        goals: previous.goals.includes(value)
          ? previous.goals.filter(item => item !== value)
          : [...previous.goals, value],
      }));
      return;
    }
    setAnswers(previous => ({ ...previous, [current.key]: value }));
  }

  function canContinue() {
    if (isContactStep) return answers.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email);
    return current.type === 'multiple' ? answers.goals.length > 0 : Boolean(answers[current.key]);
  }

  function submit(event) {
    event.preventDefault();
    const subject = encodeURIComponent('Project enquiry — ' + answers.name);
    const body = encodeURIComponent(
      'Name: ' + answers.name +
      '\nEmail: ' + answers.email +
      '\nProject: ' + answers.service +
      '\nGoals: ' + answers.goals.join(', ') +
      '\nStage: ' + answers.stage +
      '\nTimeline: ' + answers.timeline +
      '\n\nProject details: ' + (answers.details || 'Not provided')
    );
    setSubmitted(true);
    window.location.href = 'mailto:' + contact.email + '?subject=' + subject + '&body=' + body;
  }

  return (
    <main className="start-project-page">
      <header className="project-nav">
        <a href="/" className="project-nav__brand" aria-label="Dezigner X home"><XLogo /></a>
        <a href="/" className="project-nav__back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</a>
      </header>

      <section className="project-intro">
        <span className="project-eyebrow">DEZIGNER X / PROJECT ENQUIRY</span>
        <h1><span className="project-title-line">HAVE A PROJECT</span><span className="project-title-line">IN MIND?</span></h1>
      </section>

      <section className="project-content">

        <section className="project-wizard" aria-live="polite">
          {submitted ? (
            <div className="project-success">
              <span className="project-success__icon"><Check size={24} /></span>
              <span className="project-label">ENQUIRY READY</span>
              <h2>THANK YOU<span>.</span></h2>
              <p>Your email app should open with your project details.</p>
              <a href="/">BACK TO PORTFOLIO <ArrowUpRight size={17} /></a>
            </div>
          ) : (
            <>
              <div className="project-wizard__top">
                <span className="project-label">{isContactStep ? '05 / YOUR DETAILS' : current.eyebrow}</span>
                <span className="project-wizard__count">{step + 1} / 5</span>
              </div>
              <div className="project-progress" aria-label={'Step ' + (step + 1) + ' of 5'}>
                <span style={{ width: ((step + 1) / 5) * 100 + '%' }} />
              </div>

              <div key={step} className="project-wizard__body">
                {isContactStep ? (
                  <>
                    <h2>Where can I reach you<span>?</span></h2>
                    <p className="project-wizard__subtitle">Let’s keep the conversation going.</p>
                    <form className="project-wizard__form" onSubmit={submit}>
                      <label>Your name
                        <input value={answers.name} onChange={event => setAnswers(previous => ({ ...previous, name: event.target.value }))} placeholder="Full name" autoComplete="name" required />
                      </label>
                      <label>Email address
                        <input type="email" value={answers.email} onChange={event => setAnswers(previous => ({ ...previous, email: event.target.value }))} placeholder="you@example.com" autoComplete="email" required />
                      </label>
                      <label>Anything else? <span className="project-optional">OPTIONAL</span>
                        <textarea value={answers.details} onChange={event => setAnswers(previous => ({ ...previous, details: event.target.value }))} placeholder="A few details about your idea..." rows="3" />
                      </label>
                      <div className="project-wizard__actions">
                        <button type="button" className="project-back-button" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> BACK</button>
                        <button type="submit" className="project-continue" disabled={!canContinue()}>SEND ENQUIRY <ArrowUpRight size={17} /></button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h2>{current.title}</h2>
                    <p className="project-wizard__subtitle">{current.subtitle}</p>
                    <div className="project-options">
                      {current.options.map(option => {
                        const selected = current.type === 'multiple'
                          ? answers.goals.includes(option)
                          : answers[current.key] === option;
                        return (
                          <button key={option} type="button" className={'project-option' + (selected ? ' is-selected' : '')} aria-pressed={selected} onClick={() => choose(option)}>
                            <span>{option}</span>
                            {selected && <Check size={16} />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="project-wizard__actions">
                      <button type="button" className="project-back-button" onClick={() => setStep(step - 1)} disabled={step === 0}><ArrowLeft size={16} /> BACK</button>
                      <button type="button" className="project-continue" disabled={!canContinue()} onClick={() => setStep(step + 1)}>CONTINUE <ArrowRight size={17} /></button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </section>

      <footer className="project-footer">
        <a href="/" className="project-footer__brand"><XLogo small /><span>DEZIGNER X</span></a>
        <span>CREATIVE DESIGNER · DIGITAL EXPERIENCES</span>
        <a href="/" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
