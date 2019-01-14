# Zadanie rekrutacyjne - JavaScript

Zadanie rekrutacyjne dla osób aplikujących na stanowisko Młodszy Programista JavaScript.

### Zadanie polega na stworzeniu  w JS gry „Reflex”

##### Uwagi ogólne
- nie należy korzystać z żadnych zewnętrznych bibliotek (wyjątkiem, lecz nie wymogiem, jest Bootstrap)
- nie należy korzystać z żadnych frameworków
- mile widziane użycie TypeScript
- odpowiedzi prosimy przesyłać w formie linku do repozytorium


##### Wytyczne
1)    Gra rozpoczyna się od wciśnięcia przycisku ”Start”
2)    Rozgrywka trwa 60 sekund lub do straty ostatniego życia (gracz ma trzy „życia”)
3)    Czas widoczny w prawym górnym rogu
4)    Na środku gry wyświetlone są kwadraty (liczba podawana z parametru)
5)    Co 3 sekundy losowo wybrany kwadrat zapala się na zielono
6)    Kwadrat jest zapalony na zielono 2 sekundy i w tym czasie gracz musi go kliknąć
7)    Jeśli graczowi uda się kliknąć zielony, kwadrat dostaje 1 punkt
8)    Gracz traci życie, jeśli w trafi w inny kwadrat lub jeśli podświetlenie zielonego kwadratu zniknie po  2 sekundach. Pojawia się alert „straciłeś życie”
9)    Grę można zresetować - wyzerowany zostaje licznik czasu i punktów, a licznik „życia” wraca do stanu początkowego (np. 3)

##### Rysunek poglądowy
![](./img/makieta_rekrutacja.png)

### Forma wykonania zadania

Opcjonalnie możesz skorzystać z przygotowanego przez nas projektu webpackowego, który znajduje się w bieżącym repozytorium (nie jest to jednak warunek konieczny). Poniżej znajdziesz instrukcję korzystania z tego projektu.

##### Installation

Install dependencies: `yarn install` or `npm install`.

##### Development

Run `yarn start` or `npm start` to start a development server at [http://localhost:9000](http://localhost:9000).

The entry file is located in `src/index.ts` but if you prefer to use plain JavaScript you can change its name to `src/index.js` instead.

All static files from `src/static` folder will be served at [http://localhost:9000](http://localhost:9000).

Feel free to modify any configuration details in `tsconfig.json` or `webpack.config.js`, as long as it's possible to build a working app by running `yarn build` or `npm run build`.

##### Submitting the task

After finishing the task, run `npm pack` and send us back the resulting archive: `reflex-game-1.0.0.tgz`. Alternatively, just zip the contents of the project excluding `node_modules` and `dist` directories.