const jsonata = require("jsonata");
const request = require('request');

var countriesDocumentURL = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
request(countriesDocumentURL, function (error, response, body) {
    var countries = JSON.parse(body)

    var expressionAllCarabbeanCountries = jsonata(
        ` $[][subregion='Caribbean'].{"name":name.common, "capital":capital[0]}
    `);
    console.log("All Caribbean Countries\n" + JSON.stringify(expressionAllCarabbeanCountries.evaluate(countries)))

    var expressionAllCountriesBorderingWithChina = jsonata(
        `$[][$contains($join(borders),'CHN')].name.common
    `);
    console.log("All Countries [land]bordering with China \n" + JSON.stringify(expressionAllCountriesBorderingWithChina.evaluate(countries)))

    var enrichedCountries = {
        "countries": countries
        , "continents":
            [  { "name": "Asia", "population": 4436224000 }
            , { "name": "Europe", "population": 738849000 }
            , { "name": "Africa", "population": 1216130000 }
            , { "name": "Americas", "population": 10015590000 }
        ]
    }

    var expressionEnrichedCountriesWithY = jsonata(
        `$.countries[][$contains(name.common,'y')].{
                                "name":name.common
                              , "capital":capital[0]
                              , "continent":region
                              , "continentPopulation": ($var:= region; $$.continents[name=$var].population)
                              }
                     
                            `);
    console.log("Enriched Countries with Y ii name\n" + JSON.stringify(expressionEnrichedCountriesWithY.evaluate(enrichedCountries)))


});