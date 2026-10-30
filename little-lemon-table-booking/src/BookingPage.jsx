import { useMemo, useState } from "react";

const DINNER_TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function updateTimes(date) {
  return date ? DINNER_TIMES : [];
}

export function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateBooking(form, today = getLocalDate()) {
  const errors = {};
  if (!form.date) errors.date = "Choose a booking date.";
  else if (form.date < today) errors.date = "Choose today or a future date.";
  if (!form.time) errors.time = "Choose an available time.";
  if (!Number.isInteger(Number(form.guests)) || Number(form.guests) < 1 || Number(form.guests) > 10) {
    errors.guests = "Choose between 1 and 10 guests.";
  }
  if (!["Birthday", "Anniversary", "Business", "Other"].includes(form.occasion)) {
    errors.occasion = "Choose a valid occasion.";
  }
  if (!form.name?.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")) errors.email = "Enter a valid email address.";
  return errors;
}

function FieldError({ id, children }) {
  return children ? <small className="field-error" id={id}>{children}</small> : null;
}

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Birthday");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [formError, setFormError] = useState("");
  const times = useMemo(() => updateTimes(date), [date]);
  const form = { date, time, guests, occasion, name, email };
  const errors = validateBooking(form);
  const minDate = getLocalDate();

  function update(setter) {
    return (event) => {
      setter(event.target.value);
      setSubmitted(null);
      setFormError("");
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validateBooking(form);
    if (Object.keys(validation).length) {
      setFormError("Please correct the highlighted fields before continuing.");
      setSubmitted(null);
      return;
    }
    setFormError("");
    setSubmitted({ ...form, name: name.trim(), guests: Number(guests) });
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span><strong>Little Lemon</strong><small>MEDITERRANEAN KITCHEN</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">Our story</a><a className="nav-current" href="#booking">Reservations</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A LITTLE TASTE OF THE MEDITERRANEAN</p>
            <h1 id="hero-title">A table worth<br /><em>gathering around.</em></h1>
            <p>Seasonal ingredients, sun-soaked flavours, and the joy of sharing a meal. Your place at Little Lemon is just a few clicks away.</p>
            <a className="hero-link" href="#booking">Find your table <span aria-hidden="true">↗</span></a>
            <div className="hero-meta"><span>✦ Thoughtful food</span><span>✦ Warm hospitality</span></div>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of fresh lemons and Mediterranean olive leaves">
            <div className="art-ring"></div><div className="sun-disc"></div>
            <div className="lemon lemon-one"></div><div className="lemon lemon-two"></div>
            <div className="leaf leaf-one"></div><div className="leaf leaf-two"></div><div className="leaf leaf-three"></div>
            <span className="art-stamp">FRESH<br />& LOCAL</span>
            <span className="art-caption">A little sunshine on every plate.</span>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="section-intro">
            <p className="eyebrow">SAVE A SEAT, S savour THE MOMENT</p>
            <h2 id="booking-title">Let's make it a date.</h2>
            <p>Choose your details below. We'll take care of the atmosphere.</p>
          </div>
          <div className="booking-layout">
            <form className="booking-card" onSubmit={handleSubmit} noValidate>
              <div className="card-heading"><span className="step-number">01</span><div><h3>Your reservation</h3><p>Tell us when you're joining us.</p></div></div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="booking-date">Date <span aria-hidden="true">*</span></label>
                  <input id="booking-date" type="date" min={minDate} value={date} onChange={(e) => { setDate(e.target.value); setTime(""); setSubmitted(null); }} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : undefined} required />
                  <FieldError id="date-error">{errors.date}</FieldError>
                </div>
                <div className="field">
                  <label htmlFor="booking-time">Time <span aria-hidden="true">*</span></label>
                  <select id="booking-time" value={time} onChange={update(setTime)} disabled={!date} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined} required>
                    <option value="">Select a time</option>
                    {times.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <FieldError id="time-error">{errors.time}</FieldError>
                </div>
                <div className="field">
                  <label htmlFor="booking-guests">Guests <span aria-hidden="true">*</span></label>
                  <select id="booking-guests" value={guests} onChange={update(setGuests)} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : undefined} required>
                    {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1} {i === 0 ? "guest" : "guests"}</option>)}
                  </select>
                  <FieldError id="guests-error">{errors.guests}</FieldError>
                </div>
                <div className="field">
                  <label htmlFor="booking-occasion">Occasion <span aria-hidden="true">*</span></label>
                  <select id="booking-occasion" value={occasion} onChange={update(setOccasion)} aria-invalid={Boolean(errors.occasion)} aria-describedby={errors.occasion ? "occasion-error" : undefined} required>
                    <option>Birthday</option><option>Anniversary</option><option>Business</option><option>Other</option>
                  </select>
                  <FieldError id="occasion-error">{errors.occasion}</FieldError>
                </div>
              </div>
              <div className="card-heading contact-heading"><span className="step-number">02</span><div><h3>Your details</h3><p>Who should we welcome?</p></div></div>
              <div className="field">
                <label htmlFor="booking-name">Full name <span aria-hidden="true">*</span></label>
                <input id="booking-name" type="text" autoComplete="name" value={name} onChange={update(setName)} placeholder="Your name" maxLength="80" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} required />
                <FieldError id="name-error">{errors.name}</FieldError>
              </div>
              <div className="field">
                <label htmlFor="booking-email">Email address <span aria-hidden="true">*</span></label>
                <input id="booking-email" type="email" autoComplete="email" value={email} onChange={update(setEmail)} placeholder="you@example.com" maxLength="254" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required />
                <FieldError id="email-error">{errors.email}</FieldError>
              </div>
              {formError && <p className="form-alert" role="alert">{formError}</p>}
              <button className="submit-button" type="submit">Review reservation <span aria-hidden="true">↗</span></button>
              <p className="form-note"><span aria-hidden="true">🔒</span> Your details stay in this demo; no information is sent to a server.</p>
            </form>

            <aside className="booking-aside" id="about">
              <div className="aside-topline"><span className="aside-icon" aria-hidden="true">✳</span><span className="aside-label">THE LITTLE LEMON FEELING</span></div>
              <h3>Good food.<br /><em>Better company.</em></h3>
              <p>Come as you are. Stay for one more bite. We're here for everyday dinners and the moments worth celebrating.</p>
              <div className="aside-divider"></div>
              <p className="hours-title">WHEN TO FIND US</p>
              <p className="hours-row"><span>Monday – Friday</span><strong>5 pm – 10 pm</strong></p>
              <p className="hours-row"><span>Saturday – Sunday</span><strong>12 pm – 10 pm</strong></p>
              <div className="aside-note">✦ <span>Have a special request? Let our team know when you arrive.</span></div>
            </aside>
          </div>

          {submitted && <section className="confirmation" role="status" aria-live="polite" aria-labelledby="confirmation-title">
            <div className="confirmation-check" aria-hidden="true">✓</div>
            <div className="confirmation-copy">
              <p className="eyebrow">LOOKING GOOD</p>
              <h3 id="confirmation-title">Your reservation summary, {submitted.name}.</h3>
              <div className="summary-grid"><span><small>DATE</small><strong>{submitted.date}</strong></span><span><small>TIME</small><strong>{submitted.time}</strong></span><span><small>PARTY</small><strong>{submitted.guests} {submitted.guests === 1 ? "guest" : "guests"}</strong></span><span><small>OCCASION</small><strong>{submitted.occasion}</strong></span></div>
              <p className="confirmation-note">Demo only — these details have not been submitted to a restaurant or saved online.</p>
            </div>
            <button type="button" className="reset-button" onClick={() => setSubmitted(null)}>Edit details</button>
          </section>}
        </section>
      </main>
      <footer><span className="footer-brand">🍋 Little Lemon</span><span>Fresh flavours. Memorable moments.</span><span>© {new Date().getFullYear()} Little Lemon</span></footer>
    </div>
  );
}
