import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingPage, { updateTimes, validateBooking } from "./BookingPage.jsx";

describe("updateTimes", () => {
  it("returns available dinner times when a date is selected", () => {
    expect(updateTimes("2099-05-20")).toContain("19:00");
  });
  it("returns no times until a date is selected", () => {
    expect(updateTimes("")).toEqual([]);
  });
});

describe("validateBooking", () => {
  it("reports required fields for an empty form", () => {
    const errors = validateBooking({ date:"", time:"", guests:"2", occasion:"", name:"", email:"" });
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
  });
  it("accepts valid booking details", () => {
    expect(validateBooking({date:"2099-05-20",time:"19:00",guests:"2",occasion:"Birthday",name:"Sam Example",email:"sam@example.com"})).toEqual({});
  });
});

describe("BookingPage", () => {
  it("renders the booking form with labelled controls", () => {
    render(<BookingPage />);
    expect(screen.getByRole("heading", {name:"Book your table"})).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toBeInTheDocument();
  });
  it("shows validation feedback when an empty form is submitted", () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByRole("button", {name:/Reserve a table/}));
    expect(screen.getByRole("alert")).toHaveTextContent(/correct the highlighted fields/i);
  });
});