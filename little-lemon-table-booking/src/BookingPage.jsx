import { useMemo, useState } from "react";

const INITIAL_TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function updateTimes(date) {
  // In a full application, available times would be requested from a booking API.
  // This starter provides a predictable set of selectable dinner times.
  return date ? INITIAL_TIMES : [];
}

export function validateBooking(form) {
  const errors = {};
  if (!form.date) errors.date = "Choose a booking date.";
  if (form.date && form.date < new Date().toISOString().slice(0, 10)) errors.date = "Choose today or a future date.";
  if (!form.time) errors.time = "Choose an available time.";
  if (!form.guests || Number(form.guests) < 1 || Number(form.guests) > 10) errors.guests = "Choose between 1 and 10 guests.";
  if (!form.occasion) errors.occasion = "Choose an occasion.";
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  return errors;
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
  const errors = validateBooking({ date, time, guests, occasion, name, email });
  const minDate = new Date().toISOString().slice(0, 10);

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validateBooking({ date, time, guests, occasion, name, email });
    if (Object.keys(validation).length) {
      setFormError("Please correct the highlighted fields before continuing.");
      setSubmitted(null);
      return;
    }
    setFormError("");
    setSubmitted({ date, time, guests, occasion, name: name.trim(), email });
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span><strong>Little Lemon</strong><small>MEDITERRANEAN KITCHEN</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a><a className="nav-current" href="#booking">Reservations</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A LITTLE TASTE OF THE MEDITERRANEAN</p>
            <h1 id="hero-title">Make a reservation.</h1>
            <p>Good food, good company, and a table waiting just for you. Book your Little Lemon experience below.</p>
            <a className="hero-link" href="#booking">Reserve your table <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-art" role="img" aria-label="Fresh lemons, olive leaves, and Mediterranean ingredients">
            <div className="sun-disc"></div><div className="lemon lemon-one"></div><div className="lemon lemon-two"></div>
            <div className="leaf leaf-one"></div><div className="leaf leaf-two"></div><div className="leaf leaf-three"></div>
            <span className="art-caption">Fresh ingredients. Made with love.</span>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="section-intro">
            <p className="eyebrow">YOUR TABLE IS ALMOST READY</p>
            <h2 id="booking-title">Book your table</h2>
            <p>Tell us a little about your visit and we'll save you a seat.</p>
          </div>
          <div className="booking-layout">
            <form className="booking-card" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="booking-date">Choose date <span aria-hidden="true">*</span></label>
                  <input id="booking-date" type="date" min={minDate} value={date} onChange={e => { setDate(e.target.value); setTime(""); }} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : undefined} required />
                  {errors.date && <small className="field-error" id="date-error">{errors.date}</small>}
                </div>
                <div className="field">
                  <label htmlFor="booking-time">Choose time <span aria-hidden="true">*</span></label>
                  <select id="booking-time" value={time} onChange={e => setTime(e.target.value)} disabled={!date} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined} required>
                    <option value="">Select a time</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <small className="field-error" id="time-error">{errors.time}</small>}
                </div>
                <div className="field">
                  <label htmlFor="booking-guests">Number of guests <span aria-hidden="true">*</span></label>
                  <select id="booking-guests" value={guests} onChange={e => setGuests(e.target.value)} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : undefined} required>
                    {Array.from({length:10}, (_, i) => <option key={i+1} value={String(i+1)}>{i+1} {i === 0 ? "guest" : "guests"}</option>)}
                  </select>
                  {errors.guests && <small className="field-error" id="guests-error">{errors.guests}</small>}
                </div>
                <div className="field">
                  <label htmlFor="booking-occasion">Occasion <span aria-hidden="true">*</span></label>
                  <select id="booking-occasion" value={occasion} onChange={e => setOccasion(e.target.value)} aria-invalid={Boolean(errors.occasion)} required>
                    <option>Birthday</option><option>Anniversary</option><option>Business</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="booking-name">Full name <span aria-hidden="true">*</span></label>
                <input id="booking-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" maxLength="80" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} required />
                {errors.name && <small className="field-error" id="name-error">{errors.name}</small>}
              </div>
              <div className="field">
                <label htmlFor="booking-email">Email address <span aria-hidden="true">*</span></label>
                <input id="booking-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required />
                {errors.email && <small className="field-error" id="email-error">{errors.email}</small>}
              </div>
              {formError && <p className="form-alert" role="alert">{formError}</p>}
              <button className="submit-button" type="submit">Reserve a table <span aria-hidden="true">→</span></button>
              <p className="form-note">Fields marked * are required. This demo does not send your details to a server.</p>
            </form>
            <aside className="booking-aside" id="about">
              <div className="aside-icon" aria-hidden="true">✦</div>
              <h3>A little moment, made special.</h3>
              <p>From a quick dinner to a milestone celebration, there is always room for something delicious.</p>
              <div className="aside-divider"></div>
              <p className="aside-label">RESTAURANT HOURS</p>
              <p className="hours-row"><span>Monday – Friday</span><strong>5 pm – 10 pm</strong></p>
              <p className="hours-row"><span>Saturday – Sunday</span><strong>12 pm – 10 pm</strong></p>
              <p className="aside-footnote">Please arrive on time. We look forward to welcoming you.</p>
            </aside>
          </div>
          {submitted && <section className="confirmation" role="status" aria-live="polite">
            <div className="confirmation-check" aria-hidden="true">✓</div>
            <div><h3>Reservation details ready, {submitted.name}!</h3><p>{submitted.guests} guest(s) · {submitted.date} at {submitted.time} · {submitted.occasion}</p><p className="confirmation-note">This is a front-end demonstration; your booking has not been sent to a restaurant server.</p></div>
            <button type="button" className="reset-button" onClick={() => setSubmitted(null)}>Edit details</button>
          </section>}
        </section>
      </main>
      <footer><span className="footer-brand">🍋 Little Lemon</span><span>Fresh flavours. Memorable moments.</span><span>© {new Date().getFullYear()} Little Lemon</span></footer>
    </div>
  );
}