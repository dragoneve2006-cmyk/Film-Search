# 🎬 Film Search

---

## 📋 Descrizione del Progett4o
Cosè Film Search: film search nasce come idea personale per segnarsi i film visti, da vedere e quelli più belli;
Da qui ho deciso di sviluppare questa "Single Page Application" sia come prova per le mie competenze, che come esame 
ma soprattutto come strumento da uttilizzare.

NB ⚠️ : QUESTO PROGETTO PERMETTE SOLO ED ESCLUSIVAMENTE LA RICERCA DI FILM (NO SERIE TV /NO SERIE NETFLIX)

---

### 🎯 Scopo del progetto

Il progetto doveva permettermi di avere una pagina su cui visualizzare tutti i film di oggi giorno in constante aggiornamento,
la possibilita di una watchlist personalizzata divisa in DA VEDERE - VISTI - PREFERIT, 
e per puro personal learning la possibilità di una autenticazione, quindi registrazione o accesso base tutto in locale.
Tutto questo sommato ad una Grafica CSS elaborata e un uttilizzo anche di componenti ReactBits per dettagli un po' più carini.

---

## 🚀 Installazione ed Esecuzione del progetto

### Prerequisiti minimi
- Node.js (v18 o superiore)
- npm o yarn (per mac)
- API Key TMDB (in questo caso già inclusa nel progetto pk KEY pubblica)

### Installazione
1. Clona la repository
2. Entra nella cartella del progetto
    - cd film-search
3. Installa dipendenze neccessarie
    - npm install

### Esecuzione
1. Da terminale
    - npm run dev
Una volta eseguito questo comando l'applicazione sarà disponibile su:
`http://localhost:5173`

---

## 🔑 API Uttilizzata

### TMDB - The Movie Database

- **URL**: https://www.themoviedb.org/
- **Documentazione**: https://developer.themoviedb.org/docs
- **Versione API**: v3

#### API Key inclusa nel progetto:
// src/api/movies.ts
const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'

## Endpoint uttilizzati:
|       Endpoint        |   Metodo     |       Descrizione         |
|-----------------------|--------------|---------------------------|
| `/search/movie`       |    GET       | Ricerca film per titolo   |
| `/movie/popular`      |    GET       | Film popolari             |
| `/trending/movie/week`|    GET       | Film in tendenza          |
| `/movie/{id}`         |    GET       | Dettagli film specifico   |
| `/movie/{id}/credits` |    GET       | Cast e crew del film      |
| `/genre/movie/list`   |    GET       | Lista generi disponibili  |
| `/discover/movie`     |    GET       | Scopri film per genere    |
| `/movie/{id}/rating`  |    POST      | Valuta un film            |
| `/movie/{id}/rating`  |    DELETE    | Rimuovi valutazione       |

---

## 📂 Struttura del Progetto

film-search/
├── public/                         # Asset pubblici
├── src/
│   ├── api/                        # Gestione chiamate API
│   │   └── movies.ts               # Funzioni API TMDB
│   ├── components/                 # Componenti riutilizzabili
│   │   ├── ClickSpark.tsx          # Effetto click animato
│   │   ├── CustomCursor.tsx        # Cursore personalizzato
│   │   ├── ErrorMessage.tsx        # Messaggio errore
│   │   ├── FuzzyText.tsx           # Effetto testo animato
│   │   ├── Loader.tsx              # Componente loading
│   │   ├── MovieCard.tsx           # Card film
│   │   ├── MovieRating.tsx         # Componente valutazione
│   │   ├── Navbar.tsx              # Barra navigazione
│   │   └── ProtectedRoute.tsx      # Route protette
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.ts              # Hook autenticazione
│   │   └── useMovieRating.ts       # Hook gestione rating
│   ├── pages/                      # Pagine dell'applicazione
│   │   ├── Home.tsx                # Homepage
│   │   ├── Movies.tsx              # Lista film con ricerca
│   │   ├── MovieDetail.tsx         # Dettaglio singolo film
│   │   ├── Watchlist.tsx           # Gestione watchlist
│   │   ├── Favorites.tsx           # Film preferiti
│   │   ├── ToWatch.tsx             # Film da vedere
│   │   ├── Watched.tsx             # Film già visti
│   │   ├── Login.tsx               # Login utente
│   │   ├── Register.tsx            # Registrazione
│   │   ├── AccountSettings.tsx     # Impostazioni account
│   │   ├── AdminPanel.tsx          # Pannello admin
│   │   └── NotFound.tsx            # Pagina 404
│   ├── router/                     # Configurazione routing
│   │   └── AppRouter.tsx           # Router principale
│   ├── types/                      # Definizioni TypeScript
│   │   ├── auth.ts                 # Tipi autenticazione
│   │   └── movie.ts                # Tipi film
│   ├── utils/                      # Utility functions
│   │   └── authdb.ts               # Mock database utenti
│   ├── App.tsx                     # Componente root
│   ├── App.css                     # Stili globali
│   └── main.tsx                    # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

---

## 🔐 Credenziali di Test

### Admin
email : admin@example.com
password : admin123

### Utente Standard
1. Registrati:
    - crea nome utente
    - crea email
    - crea password
    - conferma password
2. Accedi: 
    - Inserisci email
    - Inserisci password
    - Clicca su accedi

⚠️ **NB** : Questa applicazione uttilizza un local storage quindi non ha nessun tipo di sicurezza beckend

---

### 🛠️ Strumenti Uttilizzati

## Core
- React 18.3.1 - Libreria UI
- TypeScript 5.6.2 - JavaScript tipizzato
- Vite 6.0.1 - Build root e dev server

## Routing - State
- React Router Dom - Routing client side
- Zustand - State managemnt base

## Data Fetching
- TanStack Query (React Query) - Gestione chiamate API e cache
- Axios - HTTP client

## Styling
- CSS - Styling custom con variabili
- Responsive design - Mobile primo approcio



