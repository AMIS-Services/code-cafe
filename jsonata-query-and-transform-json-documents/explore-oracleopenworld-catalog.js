var jsonata = require("jsonata");
var fs = require("fs");


var oow2018Filename = 'oow2018-sessions-catalog.json';

var buf = fs.readFileSync(oow2018Filename);
var catalog = JSON.parse(buf)

var expressionAllSQLSessions = jsonata(
    ` $[][$contains(title," SQL ")]."title"
    `);
console.log("All SQL Sessions\n"+ JSON.stringify(expressionAllSQLSessions.evaluate(catalog)))

var expressionCountAllCloudSessions = jsonata(
    `$count($[][$contains(title,"Cloud")])
    `);
console.log("Number of Cloud Sessions\n"+ JSON.stringify(expressionCountAllCloudSessions.evaluate(catalog)))

var expressionCountSessionsPresentedByArchitect = jsonata(
    `$count($[][speakers.$contains(jobTitle,"Architect")])
    `);
console.log("Number of Sessions presented by Architect\n"+ JSON.stringify(expressionCountSessionsPresentedByArchitect.evaluate(catalog)))


var expressionSessionsInSpecificRoom = jsonata(
    `$[][slots.room='Moscone West - Room 2003'].{"title":title, "date":slots.date,"time":slots.time}
    `);
console.log("All Sessions in Moscone West - Room 2003\n"+ JSON.stringify(expressionSessionsInSpecificRoom.evaluate(catalog)))
