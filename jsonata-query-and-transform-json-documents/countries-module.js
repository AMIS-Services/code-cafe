const jsonata = require("jsonata");
const request = require('request');
;
var countriesDocumentURL = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
var countries={};
request(countriesDocumentURL, function (error, response, body) {
    countries = JSON.parse(body)
})

module.exports.countriesQuery = function (region, nameFilter) {
    var expression = ` $[][region='${region}' ${nameFilter ? ' and $contains( name.common, \''+nameFilter+'\')':''}  ].{"name":name.common, "capital":capital[0]}`
    var expressionCountries = jsonata(expression);
    return expressionCountries.evaluate(countries);
}

