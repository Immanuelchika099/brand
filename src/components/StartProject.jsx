import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import XLogo from './XLogo';
import { contact } from '../data/content';
import './StartProject.css';

function InstagramMark({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const initialForm = { name: '', company: '', email: '', service: '', budget: '', message: '' };

export default function StartProject() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const subject = encodeURIComponent('Project enquiry — ' + form.name);
    const body = encodeURIComponent(
      'Name: ' + form.name +
      '\nCompany: ' + (form.company || 'Not provided') +
      '\nEmail / Phone: ' + form.email +
      '\nProject type: ' + (form.service || 'Not specified') +
      '\nEstimated budget: ' + (form.budget || 'Not specified') +
      '\n\nProject details:\n' + form.message
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
        <h1>HAVE A PROJECT<br /><span>IN MIND?</span></h1>
        <p>Have an idea worth bringing to life? Share a little about it. Let's make something with intention.</p>
      </section>

      <section className="project-content">
        <aside className="project-details">
          <div className="project-details__group">
            <span className="project-label">GET IN TOUCH</span>
            <a href={'mailto:' + contact.email}><Mail size={17} />{contact.email}</a>
            <a href={'tel:' + contact.phone.replaceAll(' ', '')}><Phone size={17} />{contact.phone}</a>
            <span><MapPin size={17} />{contact.location}</span>
            <a href="https://instagram.com/Dezigner_X" target="_blank" rel="noreferrer"><InstagramMark size={17} />{contact.instagram}</a>
          </div>
          <div className="project-details__group project-services">
            <span className="project-label">WHAT I CAN HELP WITH</span>
            <p>Product & UI/UX Design</p>
            <p>Brand Identity</p>
            <p>Digital Art & Visual Design</p>
            <p>Web & App Experiences</p>
          </div>
          <span className="project-side-note">GOOD WORK STARTS WITH A GOOD CONVERSATION.</span>
        </aside>

        <form className="project-form" onSubmit={submit}>
          <div className="project-form__heading">
            <span className="project-label">TELL ME ABOUT IT</span>
            <h2>Let's get to<br />the details<span>.</span></h2>
            <p>Fill in the details below and I'll get back to you.</p>
          </div>

          <div className="project-form__row">
            <label>Your name
              <input name="name" value={form.name} onChange={update} placeholder="Full name" autoComplete="name" required />
            </label>
            <label><span className="project-field-title">Company <span className="project-optional">OPTIONAL</span></span>
              <input name="company" value={form.company} onChange={update} placeholder="Company or brand" autoComplete="organization" />
            </label>
          </div>

          <label>Email or phone number
            <input name="email" value={form.email} onChange={update} placeholder="How can I reach you?" autoComplete="email" required />
          </label>

          <div className="project-form__row">
            <label>What do you need?
              <select name="service" value={form.service} onChange={update}>
                <option value="" disabled>Select a service</option>
                <option>Product & UI/UX Design</option>
                <option>Brand Identity</option>
                <option>Digital Art & Visual Design</option>
                <option>Web & App Design</option>
                <option>Something else</option>
              </select>
            </label>
            <label><span className="project-field-title">Budget <span className="project-optional">OPTIONAL</span></span>
              <select name="budget" value={form.budget} onChange={update}>
                <option value="" disabled>Select a range</option>
                <option>Below $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $3,000</option>
                <option>$3,000+</option>
                <option>Let's discuss</option>
              </select>
            </label>
          </div>

          <label>Tell me about your project
            <textarea name="message" value={form.message} onChange={update} placeholder="A little about the idea, goals, timeline, or anything I should know..." rows="5" required />
          </label>

          <div className="project-form__submit">
            <p>{submitted ? 'Your email app should open with your enquiry.' : 'Your details will be used only to respond to this enquiry.'}</p>
            <button type="submit">SEND ENQUIRY <ArrowUpRight size={18} /></button>
          </div>
        </form>
      </section>

      <footer className="project-footer">
        <a href="/" className="project-footer__brand"><XLogo small /><span>DEZIGNER X</span></a>
        <span>CREATIVE DESIGNER · DIGITAL EXPERIENCES</span>
        <a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}