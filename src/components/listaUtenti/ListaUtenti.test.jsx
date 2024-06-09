import { render, screen, fireEvent } from "@testing-library/react";
import ListaUtenti from "./ListaUtenti";

/*
---------------------------------------
TEST 1
Questo test verifica che la lista di utenti venga renderizzata correttamente
con 10 voci (il numero totale di utenti restituiti dall'API)
---------------------------------------
*/

test("renderizza la lista di utenti", async () => {
  // Renderizziamo il componente ListaUtenti
  render(<ListaUtenti />);

  // Usiamo screen.findAllByRole per cercare tutti gli elementi con il ruolo "listitem" (li)
  // Poiché il rendering della lista di utenti è asincrono (a causa della chiamata fetch),
  // utilizziamo await per aspettare che gli elementi siano effettivamente presenti nel DOM
  const userItems = await screen.findAllByRole("listitem");

  // Verifichiamo che la lunghezza dell'array di elementi "listitem" sia 10
  expect(userItems).toHaveLength(10);
});

/*
---------------------------------------
TEST 2
Questo test verifica che la lista di utenti venga filtrata correttamente
quando l'utente digita nel campo di ricerca
---------------------------------------
*/

test("filtra gli utenti in base alla ricerca", async () => {
  // Renderizziamo il componente ListaUtenti
  render(<ListaUtenti />);

  // Usiamo screen.getByPlaceholderText per trovare l'input di ricerca tramite il suo placeholder
  const searchInput = screen.getByPlaceholderText(/Cerca utente.../i);

  // Simuliamo un evento di cambio valore sull'input di ricerca
  // L'oggetto { target: { value: 'Leanne' } } simula l'oggetto evento di un input
  fireEvent.change(searchInput, { target: { value: "Leanne" } });

  // Cerchiamo tutti gli elementi "listitem" filtrati dopo l'input di ricerca
  const filteredUserItems = await screen.findAllByRole("listitem");

  // Verifichiamo che ci sia un solo elemento "listitem" filtrato
  expect(filteredUserItems).toHaveLength(1);

  // Verifichiamo che l'unico elemento "listitem" filtrato contenga il testo "Leanne Graham"
  expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
});

/*
---------------------------------------
TEST 3
Questo test verifica che l'utente selezionato cambi il colore di sfondo
quando viene cliccato
---------------------------------------
*/

test("seleziona un utente al click", async () => {
  // Renderizziamo il componente ListaUtenti
  render(<ListaUtenti />);

  // Cerchiamo l'elemento "listitem" che contiene il testo "Leanne Graham"
  const userItem = await screen.findByText("Leanne Graham");

  // Simuliamo un click sull'elemento "listitem" di "Leanne Graham"
  fireEvent.click(userItem);

  // Verifichiamo che l'elemento "listitem" abbia la classe CSS "selezionato"
  expect(userItem).toHaveClass("selezionato");
});

/*
---------------------------------------
TEST 4
Questo test verifica che solo un utente alla volta abbia lo sfondo colorato
(Se dopo aver cliccato su un utente clicco su secondo, l'altro ritorna
ad avere lo sfondo bianco iniziale)
---------------------------------------
*/

test("solo un utente alla volta ha lo sfondo colorato", async () => {
  // Renderizziamo il componente ListaUtenti
  render(<ListaUtenti />);

  // Troviamo gli elementi "listitem" per "Leanne Graham" ed "Ervin Howell"
  const userItem1 = await screen.findByText("Leanne Graham");
  const userItem2 = await screen.findByText("Ervin Howell");

  // Simuliamo il click su "Leanne Graham"
  fireEvent.click(userItem1);

  // Verifichiamo che "Leanne Graham" abbia la classe "selezionato"
  expect(userItem1).toHaveClass("selezionato");

  // Simuliamo il click su "Ervin Howell"
  fireEvent.click(userItem2);

  // Verifichiamo che "Ervin Howell" abbia la classe "selezionato"
  expect(userItem2).toHaveClass("selezionato");

  // Verifichiamo che "Leanne Graham" non abbia più la classe "selezionato"
  expect(userItem1).not.toHaveClass("selezionato");
});
