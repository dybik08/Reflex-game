# Zadanie rekrutacyjne - JavaScript

Zadanie rekrutacyjne dla osób aplikujących na stanowisko Programista JavaScript.

###Zadanie polega na stworzeniu  w JS gry „Reflex” (rys poglądowy poniżej)

##### Uwagi ogólne
- nie należy korzystać z żadnych zewnętrznych bibliotek (wyjątkiem, lecz nie wymogiem, jest Bootstrap)
- mile widziane użycie TypeScript
- odpowiedzi prosimy przesyłać w formie linku do repozytorium

#####cWytyczne
1)    Gra rozpoczyna się od wciśnięcia przycisku ”Start”
2)    Rozgrywka trwa 60 sekund lub straty ostatniego życia (gracz ma trzy  „życia”)
3)    Czas widoczny w prawym górnym rogu
4)    Na środku gry wyświetlone są kwadraty(ilość podawana z parametru)
5)    Co 2-3 sekundy losowo wybrany kwadrat zapala się na zielono
6)    Kwadrat jest zapalony na zielono 0.8 sekundy i w tym czasie gracz musi go kliknąć
7)    Jeśli graczowi uda się kliknąć zielony kwadrat dostaje 1 punkt
8)    Gracz traci życie jeśli w trafi w inny kwadrat lub jeśli podświetlenie zielonego kwadratu zniknie po  0,8 sekundy. Pojawia się alert „straciłeś życie”
9)    Grę można zresetować  - Wyzerowany zostaje licznik czasu  i punktów a licznik „życia” wraca do stanu początkowego (np. 3)

![](./img/makieta_rekrutacja.png)