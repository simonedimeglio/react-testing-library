// src/components/ListaUtenti.jsx
import { useState, useEffect } from "react";
import "./ListaUtenti.css";

export default function ListaUtenti() {
  const [listaUtenti, setListaUtenti] = useState([]);
  const [parolaRicercata, setParolaRicercata] = useState("");
  const [utenteSelezionato, setUtenteSelezionato] = useState(null);

  useEffect(() => {
    async function fetchUtenti() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setListaUtenti(data);
    }
    fetchUtenti();
  }, []);

  function ricerca(e) {
    setParolaRicercata(e.target.value);
  }

  function clickSuUtente(utenteId) {
    setUtenteSelezionato(utenteId);
  }

  const utentiFiltrati = listaUtenti.filter((utente) =>
    utente.name.toLowerCase().includes(parolaRicercata.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Cerca utente..."
        value={parolaRicercata}
        onChange={ricerca}
        className="ricerca"
      />
      <ul>
        {utentiFiltrati.map((utente) => (
          <li
            key={utente.id}
            onClick={() => clickSuUtente(utente.id)}
            className={utenteSelezionato === utente.id ? "selezionato" : ""}
          >
            {utente.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
