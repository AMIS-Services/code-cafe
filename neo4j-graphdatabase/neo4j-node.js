const neo4j = require('neo4j-driver').v1;
const request = require('request');

// SET YOUR VALUE FOR THE PASSWORD AND THE IP ADDRESS WHERE THE NEO4J SERVER CAN BE ACCESSED!!
var user = "neo4j", password = "neo4j1", uri = "bolt://192.168.188.142:7687"

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session(neo4j.WRITE);

var countriesDocumentURL = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
async function addConstraints(tx) {
    console.log(`Adding Constraints`)
    return tx.run('CREATE CONSTRAINT ON (l:Language) ASSERT l.name IS UNIQUE').then(tx.run('CREATE CONSTRAINT ON (c:Country) ASSERT c.name IS UNIQUE').then(tx.run('CREATE CONSTRAINT ON (r:Region) ASSERT r.name IS UNIQUE').then(tx.run('CREATE CONSTRAINT ON (c:Country) ASSERT c.code IS UNIQUE'))));
}


async function addLanguages(tx, languages) {
    console.log(`Adding languages`)
    var s = '';
    languages.forEach(element => s = s.concat(`CREATE (:Language {name: '${element}'})
                                             `))
    console.log("Statement " + s)
    return tx.run(s);
}
async function addRegions(tx, regions) {
    console.log(`Adding regions`)
    var s = '';
    regions.forEach(element => s = s.concat(`CREATE (:Region {name: '${element}'})
                                             `))
    console.log("Statement " + s)
    return tx.run(s);
}
async function addSubRegions(tx, subregions) {
    console.log(`Adding subregions`)
    var s = '';
    subregions.forEach(element => s = s.concat(`CREATE (:SubRegion {name: '${element}'})
                                             `))
    console.log("Statement " + s)
    return tx.run(s);
}

// Create a country node
async function addCountry(tx, country) {
    console.log(`Adding country ${country.name.common}`)
    var createCountry = `CREATE (c:Country {name: $name, capital: $capital, area: $area, code: $code})`
    var updateCountry = `MATCH (sub:SubRegion{name:$subregion}),  (reg:Region{name:$region}), (c:Country{code: $code}) 
                        `
    for (var language in country.languages) {
        updateCountry = updateCountry.concat(`
        , (${language}:Language{name:'${country.languages[language]}'})
    `)
    }

    updateCountry = updateCountry.concat(`
    MERGE (c)-[:PART_OF]->(sub)
    MERGE (c)-[:IN]->(reg)
    `)
    for (var language in country.languages) {
        updateCountry = updateCountry.concat(`
            MERGE (c)-[:SPEAKS]->(${language})
        `)
    }
    console.log(`create country ${createCountry}`)
    console.log(`update country ${updateCountry}`)
    return tx.run(createCountry
        , {
            'name': country.name.common, 'capital': country.capital, 'region': country.region
            , 'code': country.cca3, 'subregion': country.subregion
            , 'area': country.area
        }).then(tx.run(updateCountry
            , {
                'name': country.name.common, 'capital': country.capital, 'region': country.region
                , 'code': country.cca3, 'subregion': country.subregion
                , 'area': country.area
            }));
}

// Create a country node
async function addBorderingCountries(tx, country) {
    console.log(`Adding bordering countries for ${country.name.common}`)
    var matchCountry = `MATCH (c:Country { code: $code})
    `
    country.borders.forEach(borderingCountryCode => matchCountry = matchCountry.concat(`
              MATCH (${borderingCountryCode}:Country{code:'${borderingCountryCode}'})
    `))

    country.borders.forEach(borderingCountryCode => matchCountry = matchCountry.concat(`
              MERGE (c)-[:BORDERS_WITH]->(${borderingCountryCode})
    `))

    console.log(`add bordering countries ${matchCountry}`)
    return tx.run(matchCountry
        , {
            'code': country.cca3
        });
}


request(countriesDocumentURL, async function (error, response, body) {

    var countries = JSON.parse(body)
    // get unique region values (see: https://codeburst.io/javascript-array-distinct-5edc93501dc4)
    // take all elements in the countries array, for each of them: take the region element; create a s Set of all the resulting region values (a Set contains unique elements)
    var regions = [...new Set(countries.map(country => country.region))]
    var subregions = [...new Set(countries.map(country => country.subregion))]
    // see https://stackoverflow.com/questions/39837678/why-no-array-prototype-flatmap-in-javascript for this flatMap function
    const flatMap = (f, xs) =>
        xs.reduce((acc, x) =>
            acc.concat(f(x)), [])

    // take all elements in the countries array, for each of them: take the array of languages ); create one big array of all small arrays of languages (this is what the flatmap does) and turn that big array into a Set (of unique language values)
    var languages = [...new Set(flatMap(country => Object.values(country.languages), countries))]

    // prepare constraints in the Neo4J database
    await session.writeTransaction(tx => addConstraints(tx))
    //now create objects in Neo4J for each category
    await session.writeTransaction(tx => addLanguages(tx, languages))
    await session.writeTransaction(tx => addRegions(tx, regions))
    await session.writeTransaction(tx => addSubRegions(tx, subregions))

    for (var i = 0; i < countries.length; i++) {
        var country = countries[i]
        await session.writeTransaction(tx => addCountry(tx, country))
    }
    // add bordering countries
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i]
        if (country.borders && country.borders.length > 0)
            await session.writeTransaction(tx => addBorderingCountries(tx, country))
    }



    session.close();
    driver.close();
    console.log("Done")
});
