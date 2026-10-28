# Little Lemon — Table Booking Web Application

A responsive React project for the Little Lemon restaurant table-booking capstone assignment. It demonstrates a booking form, controlled React state, client-side validation, accessible labels and error messages, responsive styling, and unit tests.

## Features

- React form for booking date, time, party size, occasion, guest name and email.
- Date field blocks past dates; available time choices are enabled after a date is selected.
- Validation for required fields, email format and party sizes from 1–10.
- Accessible form labels, `aria-invalid`, error descriptions, and live confirmation/status feedback.
- Responsive layout for desktop, tablet and mobile, with reduced-motion support.
- Unit tests for time options, validation and key form behaviour.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build and test

```bash
npm test
npm run build
```

## Important scope note

This is a front-end demonstration. It validates and presents booking details in the browser but does not connect to a reservation API or store bookings on a server. The available-time helper is intentionally deterministic and can be connected to an API in a later iteration.

## Project structure

```
little-lemon-table-booking/
├── index.html
├── package.json
├── README.md
└── src/
    ├── BookingPage.jsx
    ├── BookingPage.test.jsx
    ├── main.jsx
    └── styles.css
```

## Accessibility and maintainability

Inputs have visible labels and required indicators. Validation is expressed as text rather than color alone. Components and CSS are separated into focused files, and the validation/time helpers are exported for direct testing.