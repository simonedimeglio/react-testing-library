# **Guida all'Installazione e Introduzione ai Test in React**

Il testing è una parte cruciale dello sviluppo software. Aiuta a garantire che il nostro codice funzioni come previsto e a prevenire bug prima che raggiungano gli utenti finali.

In questa guida, ci concentreremo sui test in React usando *React Testing Library*.

### Tipi di Test

1. **Unit Test:** Verificano il funzionamento di singoli componenti o funzioni.
2. **Integration Test:** Verificano come i diversi componenti interagiscono tra loro.
3. **End-to-End (E2E) Test:** Testano l'applicazione intera simulando il comportamento dell'utente.

### Strumenti di Testing

- **React Testing Library**: Una libreria per testare i componenti React in un modo che rispecchi l'uso reale da parte degli utenti.
- **Vitest**: Un test runner veloce e moderno, particolarmente adatto per progetti Vite.

## Sintassi RTL

La sintassi del test che andremo a realizzare fa parte del framework di testing React Testing Library (RTL).

Questo framework è progettato per testare componenti React in modo efficace e intuitivo, concentrandosi sul comportamento dell'interfaccia utente piuttosto che sulla struttura interna del componente: il problema è che introduce ulteriore sintassi da conoscere!

Cerchiamo di approfondire le basi:

1. **render**: La funzione `render` viene utilizzata per renderizzare un componente React nel "contenitore" virtuale fornito da RTL. Questo simula il rendering del componente come verrebbe fatto nell'applicazione reale.

2. **screen**: L'oggetto `screen` contiene una serie di metodi per selezionare elementi dall'interfaccia utente renderizzata. Ad esempio, `screen.getByText` viene utilizzato per trovare un elemento che contiene un certo testo.

3. **fireEvent**: L'oggetto `fireEvent` viene utilizzato per simulare eventi come clic, inserimento di testo, cambiamenti di valore e così via sugli elementi dell'interfaccia utente. *Ad esempio, `fireEvent.click` simula un clic su un elemento*.

4. **test**: La funzione `test` è fornita da Jest, il framework di testing su cui si basa RTL. È utilizzata per definire un singolo test all'interno del file di test. Un test può contenere più step per verificare il comportamento del componente.

5. **expect**: La funzione `expect` viene utilizzata per fare asserzioni sui risultati del test. Ad esempio, `expect(element).toBeInTheDocument()` verifica che un certo elemento sia presente nell'interfaccia utente renderizzata.

6. **Espressioni regolari**: Le espressioni regolari (regex) sono utilizzate per definire pattern di ricerca all'interno del testo degli elementi dell'interfaccia utente. Ad esempio, `/valore del contatore: 0/i` è un'espressione regolare che corrisponde a qualsiasi testo che contiene "valore del contatore: 0", indipendentemente dalle maiuscole o minuscole.


## Testare il rendering dei componenti

Per testare un componente, è necessario prima renderizzarlo nel contenitore virtuale fornito da RTL.

Questo viene fatto utilizzando la funzione `render`, come nel seguente esempio:

```jsx
import { render } from '@testing-library/react';
import MioComponente from './MioComponente';

render(<MioComponente />);
```

## Selezionare gli elementi dell'interfaccia utente

Dopo aver verificato il corretto rendering del componente, possiamo selezionare gli elementi dell'interfaccia utente utilizzando l'oggetto `screen`.

RTL fornisce diverse query per selezionare gli elementi in base al loro testo, ruolo, attributi, stato, ecc.

- `get*`: Queste query restituiscono un elemento e lanciano un'eccezione se l'elemento non viene trovato.
- `query*`: Queste query restituiscono l'elemento o `null` se l'elemento non viene trovato.
- `find*`: Queste query restituiscono una promessa che si risolve con l'elemento quando viene trovato, o un'eccezione se l'elemento non viene trovato entro un determinato timeout.

Alcune delle query più comuni sono:

- `getByText`: Seleziona un elemento in base al suo testo visibile.
- `getByRole`: Seleziona un elemento in base al suo ruolo (ad es. "button", "heading", "link", ecc.).
- `getByLabelText`: Seleziona un "elemento form" in base al testo dell'etichetta associata.
- `getByPlaceholderText`: Seleziona un "elemento form" in base al testo del placeholder che gli hai associato.
- `getByAltText`: Seleziona un elemento immagine in base al testo alternativo, ovvero il testo associato all'attributo "alt".

Esempio:

```jsx
import { screen } from '@testing-library/react';

const buttonElement = screen.getByText('Cliccami');
const headingElement = screen.getByRole('heading', { level: 1 });
```

### Attributo `data-testid`

Per semplificare la selezione degli elementi nell'interfaccia utente, è possibile utilizzare l'attributo `data-testid`.

Questo attributo può essere assegnato agli elementi nel codice e utilizzato per selezionarli nei test come nel seguente esempio:

```jsx
// Nel Componente.jsx potreste avere un codice del genere:
<button data-testid="mio-bottone">Cliccami</button>

// Nel Componente.test.jsx invece, un codice del genere:
const buttonElement = screen.getByTestId('mio-bottone');
```


## Interagire con gli elementi

Dopo aver selezionato gli elementi dell'interfaccia utente, è possibile interagire con essi utilizzando la funzione `fireEvent`.

Questa funzione simula eventi come clic, inserimento di testo, cambiamenti di valore, ecc.

```
import { fireEvent } from '@testing-library/react';

const inputElement = screen.getByLabelText('Nome');
fireEvent.change(inputElement, { target: { value: 'John Doe' } });

const buttonElement = screen.getByText('Invia');
fireEvent.click(buttonElement);
```

## Effettuare "asserzioni"

Dopo aver interagito con il componente, è necessario verificare che il suo comportamento sia corretto.

Questo viene fatto utilizzando la funzione `expect` fornita da Jest.

```
import { screen } from '@testing-library/react';

const messageElement = screen.getByText('Benvenuto, John Doe!');
expect(messageElement).toBeInTheDocument();
```

## Mock delle chiamate API

Nel mondo del testing, è comune simulare le chiamate API piuttosto che farle veramente. Questo approccio si chiama **mocking** ed ha diversi vantaggi.

1. **Isolamento:** i test sono isolati e non dipendono da servizi esterni. Tradotto: test affidabili e riproducibili.
2. **Velocità:** i test eseguiti con chiamate API vere possono diventare veramente lenti, sopratutto se l'API ha una latenza importante.
3. **Costo:** Evitando di fare chiamate API ad ogni test, potremmo risparmiare costi importanti in caso di chiamate "a pagamento".

Mockare le chiamate API è una pratica fondamentale per garantire che i test siano affidabili e veloci. Possiamo facilmente isolare il nostro codice dalle dipendenze esterne e creare scenari di test specifici che ci permettono di verificare il comportamento dei nostri componenti in modo accurato.

Se il componente da testare effettua chiamate API, è possibile utilizzare la funzione `jest.mock` o, se il progetto è stato creato via *vite*, `vi.mock` (in Vitest) per simulare le risposte dell'API.

Esempio:

```jsx
// Importa le librerie necessarie per il test

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock della funzione fetch
// Stiamo sostituendo la funzione fetch globale con una versione mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'John Doe' },  // Dati utente mockati
      { id: 2, name: 'Jane Doe' },
      // Aggiungi altri utenti qui se necessario
    ]),
  })
);

// Definisci il test per il componente UserList
test('renders user list from API', async () => {

  // Renderizza il componente UserList
  render(<UserList />);

  // Aspetta che gli utenti vengano visualizzati
  // `waitFor` aspetta fino a quando gli elementi con ruolo 'listitem' vengono trovati nel DOM
  const userItems = await waitFor(() => screen.getAllByRole('listitem'));

  // Verifica che il numero di elementi nella lista sia corretto
  expect(userItems).toHaveLength(2); // Modifica il numero in base agli utenti mockati

  // Verifica che i nomi degli utenti mockati siano presenti nel documento
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
});

// Pulizia del mock dopo ogni test
// Resetta il mock della funzione fetch in modo che non influenzi altri test
afterEach(() => {
  fetch.mockClear();
});
```

Esempio con Vitest per progetti Vite:

```
// Esempio con vi.mock per progetti realizzati con Vite
import { vi } from 'vitest';

vi.mock('./api', () => ({
  fetchData: () => Promise.resolve({ data: 'mock data' }),
}));
```

## Test asincroni

Se il componente da testare ha effetti collaterali asincroni (come le chiamate API), è necessario attendere che questi effetti vengano completati prima di effettuare le asserzioni. Questo può essere fatto utilizzando le utility `waitFor`, `findBy` o `await`.

```
import { screen, waitFor } from '@testing-library/react';

await waitFor(() => {
  const loadingElement = screen.queryByText('Loading...');
  expect(loadingElement).not.toBeInTheDocument();
});
```

### Una delle best practice da implementare: la pulizia dopo i test

È buona norma pulire gli effetti collaterali dopo ogni test per evitare interferenze tra i diversi test. Questo può essere fatto utilizzando la funzione `cleanup` fornita da RTL.

```
import { cleanup } from '@testing-library/react';

afterEach(cleanup);
```


## Esempi di vari casi di test

### Verificare che un componente venga montato correttamente

1. Renderizzare il componente utilizzando `render(<MioComponente />)`.
2. Selezionare un elemento all'interno del componente utilizzando le query appropriate (ad es. `screen.getByText`, `screen.getByRole`, `screen.getByTestId`).
3. Verificare che l'elemento sia presente nell'interfaccia utente utilizzando `expect(elemento).toBeInTheDocument()`.

### **Verificare che vengano renderizzati tanti elementi (ad es. card di Bootstrap) quanti sono gli elementi nel JSON**:

1. Renderizzare il componente che contiene la lista di elementi.
2. Selezionare tutti gli elementi della lista utilizzando `screen.getAllByRole('listitem')` o una query simile.
3. Verificare che la lunghezza dell'array di elementi corrisponda al numero di elementi nel JSON utilizzando `expect(elementi).toHaveLength(numeroDiElementi)`.
### **Verificare che un componente interno ad un altro componente venga montato correttamente**:

1. Seguire le stesse istruzioni del punto 1 dell'esempio precedente, ma selezionando un elemento all'interno del componente interno.

### **Verificare che il filtraggio di elementi in pagina (ad es. card di Bootstrap) avvenga correttamente tramite l'inserimento di parole nella casella di ricerca interna ad una navbar**:

1. Renderizzare il componente che contiene la lista di elementi e la casella di ricerca.
2. Selezionare la casella di ricerca utilizzando `screen.getByPlaceholderText` o una query simile.
3. Simulare l'inserimento di testo nella casella di ricerca utilizzando `fireEvent.change(casellaDiRicerca, { target: { value: 'testoInserito' } })`.
4. Selezionare gli elementi filtrati utilizzando `screen.getAllByRole('listitem')` o una query simile.
5. Verificare che la lunghezza dell'array di elementi filtrati corrisponda al numero atteso utilizzando `expect(elementiFiltrati).toHaveLength(numeroAttesoElementiFiltrati)`.

### **Verificare che, cliccando su un elemento, questo cambi una proprietà CSS (ad es. un colore di sfondo)**:

1. Renderizzare il componente che contiene l'elemento cliccabile.
2. Selezionare l'elemento utilizzando una query appropriata.
3. Simulare il clic sull'elemento utilizzando `fireEvent.click(elemento)`.
4. Verificare che l'elemento abbia la classe CSS desiderata utilizzando `expect(elemento).toHaveClass('nomeClasse')`.

### **Verificare che il cambiamento al click su un elemento avvenga solo per un elemento alla volta**:

1. Renderizzare il componente che contiene gli elementi cliccabili.
2. Selezionare due elementi utilizzando query appropriate.
3. Simulare il clic sul primo elemento utilizzando `fireEvent.click(elemento1)`.
4. Verificare che il primo elemento abbia la classe CSS desiderata utilizzando `expect(elemento1).toHaveClass('nomeClasse')`.
5. Simulare il clic sul secondo elemento utilizzando `fireEvent.click(elemento2)`.
6. Verificare che il secondo elemento abbia la classe CSS desiderata utilizzando `expect(elemento2).toHaveClass('nomeClasse')`.
7. Verificare che il primo elemento non abbia più la classe CSS desiderata utilizzando `expect(elemento1).not.toHaveClass('nomeClasse')`.

### **Verificare che, all'avvio della pagina, senza aver ancora cliccato su nessun elemento, non ci siano istanze di un componente interno alle card nel DOM (ad es. commenti interni alle card)**:

1. Renderizzare il componente che contiene le card e i componenti interni.
2. Selezionare il componente interno utilizzando una query appropriata.
3. Verificare che il componente interno non sia presente nell'interfaccia utente utilizzando `expect(componenteInterno).not.toBeInTheDocument()`.

### **Verificare che, ad esempio cliccando su un componente che abbia un elemento esterno, tipo ad esempio delle recensioni, queste recensioni vengano caricate correttamente nel DOM**:

1. Renderizzare il componente che contiene il componente cliccabile e le recensioni.
2. Selezionare il componente cliccabile utilizzando una query appropriata.
3. Simulare il clic sul componente cliccabile utilizzando `fireEvent.click(componenteCliccabile)`.
4. Selezionare le recensioni utilizzando una query appropriata.
5. Verificare che le recensioni siano presenti nell'interfaccia utente utilizzando `expect(recensioni).toBeInTheDocument()`.

NB: Ricorda che questa è solo una guida generale. Per affrontare casi più complessi, potrebbe essere necessario utilizzare altre funzionalità di React Testing Library.
