import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingPage, { getLocalDate, updateTimes, validateBooking } from "./BookingPage.jsx";

describe("date and time helpers", () => {
  it("returns available dinner times when a date is selected", () => {
    expect(updateTimes("2099-05-20")).toContain("19:00");
  });

  it("returns no times until a date is selected", () => {
    expect(updateTimes("")).toEqual([]);
  });

  it("formats dates using local calendar fields", () => {
    expect(getLocalDate(new Date(2026, 9, 30))).toBe("2026-10-30");
  });
});

describe("validateBooking", () => {
  const validBooking = {
    date: "2099-05-20",
    time: "19:00",
    guests: "2",
    occasion: "Birthday",
    name: "Sam Example",
    email: "sam@example.com"
  };

  it("reports required fields for an empty form", () => {
    const errors = validateBooking({ ...validBooking, date: "", time: "", occasion: "", name: "", email: "" });
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
    expect(errors.occasion).toBeTruthy();
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
  });

  it("accepts valid booking details", () => {
    expect(validateBooking(validBooking)).toEqual({});
  });

  it("rejects dates before the supplied local date", () => {
    expect(validateBooking({ ...validBooking, date: "2026-10-29" }, "2026-10-30").date).toMatch(/future date/);
  });

  it("rejects party sizes outside the supported range", () => {
    expect(validateBooking({ ...validBooking, guests: "11" }).guests).toBeTruthy();
    expect(validateBooking({ ...validBooking, guests: "0" }).guests).toBeTruthy();
  });

  it("rejects malformed email addresses", () => {
    expect(validateBooking({ ...validBooking, email: "not-an-email" }).email).toBeTruthy();
  });

  it("rejects unsupported occasions", () => {
    expect(validateBooking({ ...validBooking, occasion: "Unlisted event" }).occasion).toBeTruthy();
  });
});

describe("BookingPage", () => {
  it("renders the booking form with labelled controls", () => {
    render(<BookingPage />);
    expect(screen.getByRole("heading", { name: "Let's make it a date." })).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
  });

  it("shows validation feedback when an empty form is submitted", () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByRole("button", { name: /Review reservation/ }));
    expect(screen.getByRole("alert")).toHaveTextContent(/correct the highlighted fields/i);
  });

  it("enables time selection after choosing a date and displays a review summary", () => {
    render(<BookingPage />);
    fireEvent.change(screen.getByLabelText(/Date/), { target: { value: "2099-05-20" } });
    const timeSelect = screen.getByLabelText(/Time/);
    expect(timeSelect).toBeEnabled();
    fireEvent.change(timeSelect, { target: { value: "19:00" } });
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Sam Example" } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "sam@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Review reservation/ }));
    expect(screen.getByRole("status")).toHaveTextContent(/Sam Example/);
    expect(screen.getByRole("status")).toHaveTextContent(/19:00/);
    expect(screen.getByRole("status")).toHaveTextContent(/Demo only/);
  });
});
