# Little Lemon — Table Booking

A responsive React + Vite restaurant reservation interface inspired by the warm, fresh feel of a Mediterranean dining experience.

## Features

- Editorial-style landing section and responsive booking layout.
- Controlled React form for date, time, party size, occasion, name and email.
- Local-date minimum to avoid timezone-related date shifts.
- Client-side validation with field-level accessible errors.
- Reservation review summary with a clear edit path.
- Responsive layouts for desktop, tablet and mobile.
- Reduced-motion support and semantic page landmarks.
- Vitest tests for date handling, validation and core form behavior.

## Tech stack

- React 18
- Vite 6
- Plain CSS
- Vitest and React Testing Library

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Test and production build

```bash
npm test
npm run build
```

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

## Booking flow scope

This repository is a front-end demonstration. The form validates the details and displays a review summary in the browser. It does **not** create, transmit, or persist a real restaurant reservation. Available times are deterministic sample data; connect a reservation API and server-side availability checks before using it in production.

## Accessibility

All form controls have programmatic labels, required indicators, field-level error descriptions, and invalid-state attributes. Submission feedback is announced through a live region. Keyboard focus is visible, and reduced-motion preferences are respected.
