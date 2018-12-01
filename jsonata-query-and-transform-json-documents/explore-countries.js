const jsonata = require("jsonata");
const request = require('request');

var countriesDocumentURL= "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
request(countriesDocumentURL, function (error, response, body) {
  var countries = JSON.parse(body)

  var expressionAllCarabbeanCountries  = jsonata(
    ` $[][subregion='Caribbean'].{"name":name.common, "capital":capital[0]}
    `);
  console.log("All Caribbean Countries\n"+ JSON.stringify(expressionAllCarabbeanCountries.evaluate(countries)))

  var expressionAllCountriesBorderingWithChina  = jsonata(
    `$[][$contains($join(borders),'CHN')].name.common
    `);
  console.log("All Countries [land]bordering with China \n"+ JSON.stringify(expressionAllCountriesBorderingWithChina.evaluate(countries)))


});