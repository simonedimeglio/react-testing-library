// src/components/Contatore.jsx
import { useState } from "react";

export default function Contatore() {
  const [contatore, setContatore] = useState(0);

  function incrementaContatore() {
    setContatore(contatore + 1);
  }

  function decrementaContatore() {
    setContatore(contatore - 1);
  }

  return (
    <div>
      <h2>Valore del contatore: {contatore}</h2>
      <button onClick={incrementaContatore}>Incrementa</button>
      <button onClick={decrementaContatore}>Decrementa</button>
    </div>
  );
}
