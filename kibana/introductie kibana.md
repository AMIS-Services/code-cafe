# Introductie

Kibana is een eenvoudinge, maar krachtige tool om snel en herbruikbaar grote hoeveelheden data inzichtelijk te maken, wanneer dit al lang niet meer met de hand kan. Kibana maakt gebruik van Elasticsearch, een library om grote hoeveelheden tekst te doorzoeken. Over Elasticsearch: data in JSON, toegang via REST API, vrije documentstructuur. Samen met Logstash vormen ze de 'Elastic stack', eerder ook  wel 'ELK stack' genoemd.

## Kibana installeren

Hosted:
  `https://www.elastic.co/cloud/elasticsearch-service/signup`
Windows:
  `https://www.elastic.co/guide/en/kibana/current/windows.html`
	Download de zip, unzip en start $KIBANA_HOME\bin\kibana.bat
RPM:
  `https://www.elastic.co/guide/en/kibana/current/rpm.html`

## Sample data invoeren

- Klik op de home page op de link naast 'Sample data'.
- Klik op de eCommerce sample data card op 'add'.
- Klik op 'view data'.

# Waarom visualiseren?
Integratie is allesbehalve glamoureus. Iedereen die werkt tussen back- en front-end, weet dat de mooiste oplossingen vaak niet gezien worden. Visualiseren maakt dat onzichtbaar werk zichtbaar. De ‘business’ wil vaak inzicht in hoe het gaat met de ontwikkeling en het onderhoud van een applicatie, ongeacht hoe dit gebeurt. Door zaken visueel te maken breek je door de 'taalbarriere' die bestaat tussen de IT-er en de nIT-er. Daarnaast een visuele interface veel eenvoudiger monitoren voor jezelf, maar ook voor andere partijen. Zo kan iemand die je applicatie niet goed kent, wel zien wat er mee gebeurt, en daarop aansturen. Ook zijn visualisaties indeaal voor demo’s en wekelijkse/maandelijkse rapportages.

# Hoe wel, en hoe niet?
## Wel:
- Geef je data vorm met het doel in gedachten, bedenk wat je uiteindelijk wilt weergeven of monitoren en laat dat bepalend zijn in wat je hoe opslaat.
- Denk in indexes, niet in tabellen, het gaat niet om een uniforme dataset.
- Voer netjes mappings en tokenizations op, om je invoer betekenis te geven.
## Niet:
- Relaties tussen entries. Het kan even wennen zijn, maar alles mag en alles kan, zonder dat er een relatie is tussen entries.
- Achteraf waarden berekenen. Dit is eigenlijk ook in strijd met puntje 1 van 'wel'. Kibana is geen rekentool: sorteren, tellen, middelen e.d. gaat natuurlijk prima, maar denk vooraf na over je data.

# Wat biedt Kibana?
- **Discover**: Elasticsearch (met Lucene Query String syntax), een ingang in je data om te kunnen filteren, sorteren en daadwerkelijk je entries te zien.
- **Visualize**: het visueel maken van 1 of meerdere eigenschappen.
- **Dashboarding**: meerdere visualisaties en tabellen in 1 oogopslag.
- **Timelion**: time series om dataverloop over tijd weer te geven.
- **Canvas**: herbruikbare rapportage, gevuld met live data.
- **Machine learning**: eenvoudige herkennen van Anomalies e.d., om minder waardeloze meldingen te krijgen, en juist wel een heads up als er iets 'geks' gebeurt.

# Voorbeelden uit de praktijk
MISA bij Medux gebruikt Kibana voor:
* Eventrapportage en monitoring (successrate, errortypes, API performance, etc.)
* Data tracking across API’s
* Troubleshooting
* ‘Weggeef-dashboards’: dashboards die nuttig zijn voor feedback door klantenservice / front end / back end / business
* Machine learned anomaly detection

# Zelf aan de slag!
- Installeer Kibana
- Selecteer op de Discover page de eCommerce sample data
- Probeer op de discover pagina een gevoel te krijgen bij de data
- Maak een nieuwe visualisatie
- Maak een dashboard en zet je visualisatie er in
Maak het dashboard interactief met behulp van input elementen
