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
    console.log("Enriched Countries with Y in name\n" + JSON.stringify(expressionEnrichedCountriesWithY.evaluate(enrichedCountries)))

    var expressionCompareNedAndBel = jsonata(
        `(
            $ned:= $[][name.common='Netherlands'];
            $bel:= $[][name.common='Belgium'];
            {"Comparison": "Netherlands and Belgium" 
            , "Region": $ned.region & ' vs ' & $bel.region
            , "Capital": $ned.capital & ' vs ' & $bel.capital
            , "Languages": $ned.languages & ' vs ' & $bel.languages
            , "Area": $ned.area & ' vs ' & $bel.area
            })
            `);
    console.log("Comparison between Netherlands and Belgium\n" 
       + JSON.stringify(expressionCompareNedAndBel.evaluate(countries)))

});