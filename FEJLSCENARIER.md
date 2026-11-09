# Fejlscenarier

Når man arbejder med oprettelse af elementer via et API, kan der opstå forskellige fejlscenarier. Det er derfor vigtigt at håndtere disse med tydelige fejlmeddelelser, så brugeren forstår, hvad der er gået galt, og hvordan problemet kan løses.

## Hvilke felter kan være relevante til at oprette en opskrift?
- Titel
- Tid
- Antal postioner
- Ingredienser
- Fremgangsmetode
- Evt. link

## Hvilke scenarier kan der være?

- API'et kan være nede og kan derfor ikke oprettes
- Opskriften kan ikke kun være tal
- Man må ikke tilføje når det er et tomt inputfelt
- Opskriften findes allerede

## Hvilke meddelelser skal man få?

- Kunne ikke oprette opskriften. Prøv igen senere.
- Dette felt må ikke indeholde tal.
- Udfyld venligst dette felt
- Denne opskrift eksisterer allerede.
