const neo4j = require('neo4j-driver').v1;
const request = require('request');

// SET YOUR VALUE FOR THE PASSWORD AND THE IP ADDRESS WHERE THE NEO4J SERVER CAN BE ACCESSED!!
var user="neo4j", password="neo4j1", uri="bolt://192.168.188.142:7687"

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session(neo4j.WRITE);

var countriesDocumentURL = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"

async function addLanguages(tx, languages) {
    console.log(`Adding languages`)
    var s = "";
    languages.forEach( element => s=s.concat(`CREATE (:Language {name: '${element}'})
                                             `))
console.log("Statement "+s)
                                             return tx.run(s);
  }
  async function addRegions(tx,regions) {
    console.log(`Adding regions`)
    var s = "";
    regions.forEach( element => s=s.concat(`CREATE (:Region {name: '${element}'})
                                             `))
console.log("Statement "+s)
                                             return tx.run(s);
  }
  async function addSubRegions(tx,subregions) {
    console.log(`Adding subregions`)
    var s = "";
    subregions.forEach( element => s=s.concat(`CREATE (:SubRegion {name: '${element}'})
                                             `))
console.log("Statement "+s)
                                             return tx.run(s);
  }

// Create a country node
async function addCountry(tx, country) {
    console.log(`Adding country ${country.name.common}`)
    return tx.run(`CREATE (c:Country {name: $name, capital: $capital, area: $area, code: $code})
                   MERGE (c)-[:PART_OF]->(Subregion{name:$subregion})
                   `
                          , {'name': country.name.common, 'capital':country.capital, 'region':country.region
                          ,  'code':country.cca3, 'subregion':country.subregion
                          ,  'area':country.area
                        });
  }

request(countriesDocumentURL, async function (error, response, body) {
  var countries = JSON.parse(body)
  // get unique region values
  var regions = [...new Set(countries.map( country => country.region))]
  var subregions = [...new Set(countries.map( country => country.subregion))]
  // see https://stackoverflow.com/questions/39837678/why-no-array-prototype-flatmap-in-javascript for this flatMap function
  const flatMap = (f,xs) =>
  xs.reduce((acc,x) =>
    acc.concat(f(x)), [])
  var languages  = [...new Set( flatMap( country => Object.values(country.languages), countries))]

  //now create objects in Neo4J for each category
console.log(JSON.stringify(languages))
await session.writeTransaction(tx => addLanguages(tx, languages))
await session.writeTransaction(tx => addRegions(tx, regions))
await session.writeTransaction(tx => addSubRegions(tx,subregions))


  for (var i=0; i< countries.length-250;i++) { 
      var country = countries[i]
      console.log(country.name.common+ country.languages+country.region+country.subregion+country.area+ country.capital+country.cca3+country.borders)
      await session.writeTransaction(tx => addCountry(tx, country))
 }
   

  
    session.close();
    driver.close();
    console.log("Done")
  });
