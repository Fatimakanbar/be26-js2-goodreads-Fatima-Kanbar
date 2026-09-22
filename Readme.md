# Köra projektet lokalt
 npm run dev


----------------------------------------
Jag har även publicerad version på Netlify
    Länken tilll Netlify
        https://goodreads-fatima-kanbar.netlify.app

    Länken till GitHub
        https://github.com/Fatimakanbar/be26-js2-goodreads-Fatima-Kanbar.git


Denna appen är en webbapp där du kan hålla koll på böcker du vill läsa, har läst, och betygsätta dem.

# Vad kan appen göra
----------------------------------------
* Visa alla böcker i din lista
* lägg till en ny bok (titel + författare)
* Markera en bok som läst / oläst
* Betygsätta en bok (bara möjligt om den är markerad som läst)
* Ta bort en bok från listan


# Databas
----------------------------------------
All data sparas på Firebase Realtime Database, så listan finns kvar även om du stänger fliken eller laddar om sidan.


# Teknik appen är bygg med 
----------------------------------------
* JavaScript (vanlig, ingen ramverk som React) – all logik och interaktivitet
* Firebase Realtime Database – databasen där böckerna sparas, via dess REST API (vanliga fetch-anrop, inget extra bibliotek)
* Vite – verktyget som bygger ihop koden till en färdig webbsida
* Netlify – där sidan är publicerad/hostad live


# Uppdelning av projektet 
----------------------------------------
Varje fil har ett tydligt ansvar. Om något med databasen krånglar vet jag att jag ska kolla api.js. Om utseendet är fel, ui.js eller style.css. Det gör koden lättare att felsöka och bygga vidare på.

src/
  Book.js     - klassen som beskriver en bok
  api.js      - all kommunikation med databasen (hämta, lägga till, ändra, ta bort)
  ui.js       - visar böckerna på sidan och hanterar klick/formulär
  main.js     - startpunkten, kopplar ihop allt ovan
  style.css   - utseendet
index.html    - sidans grundstruktur


# Hur Hur fungerar det bakom kulisserna?
----------------------------------------
När sidan laddas hämtar api.js alla böcker från Firebase.
Varje bok görs om till en Book-instans (en riktig, strukturerad "bok"-objekt) via klassen i Book.js.
ui.js ritar upp varje bok som ett kort på sidan, med kryssruta för "läst", en betygs-meny (om läst), och en "ta bort"-knapp.
Klickar du på något (kryssrutan, betyget, ta bort, eller skickar formuläret) skickas en förfrågan till Firebase för att spara ändringen, och sidan ritas om så den visar det senaste läget.


# Book-klassen
----------------------------------------
Varje bok är en instans av klassen Book. Bokens egenskaper (titel, författare, läst-status, betyg) är privata – de går inte att ändra direkt utifrån, bara genom klassens egna metoder. Till exempel: metoden som sätter ett betyg kollar själv att boken faktiskt är markerad som läst innan den tillåter det. Det håller reglerna för hur en bok får ändras samlade på ett ställe, istället för utspridda i koden.


