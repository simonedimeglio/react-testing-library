// src/components/Contatore.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Contatore from "./Contatore";

test("rende il contatore con valore iniziale 0", () => {
  render(<Contatore />);
  const counterElement = screen.getByText(/Valore del contatore: 0/i);
  expect(counterElement).toBeInTheDocument();
});

test("incrementa il valore del contatore quando viene premuto il pulsante Incrementa", () => {
  render(<Contatore />);
  const incrementButton = screen.getByText(/Incrementa/i);
  fireEvent.click(incrementButton);
  const counterElement = screen.getByText(/Valore del contatore: 1/i);
  expect(counterElement).toBeInTheDocument();
});

test("decrementa il valore del contatore quando viene premuto il pulsante Decrementa", () => {
  render(<Contatore />);
  const decrementButton = screen.getByText(/Decrementa/i);
  fireEvent.click(decrementButton);
  const counterElement = screen.getByText(/Valore del contatore: -1/i);
  expect(counterElement).toBeInTheDocument();
});
