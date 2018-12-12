# Explore JSONata

JSONata is a lightweight query and transformation language for JSON data. It reminds me of XPath and XSLT or XQuery. Queries and transformations can be expressed in JSONata using declarative and intuitive syntax (for example: expression Account.Order[0].OrderID to quert the OrderID property of the first Order element in an Account object). The npm module `jsonata` provides a JavaScript implementation that can be used in Node JS and in client side browser code. 

## Try Out JSONata in browser-based Explorer tool

Try out JSONata in the live browser based JSONata explorer:  http://try.jsonata.org/ 

Note: see below for running the JSONata Exerciser locally (for example in case the site is not available)

Some expressions on the example Account document:

Get the name of of the first product in the first order: `{"name": Account.Order[0].Product[0]."Product Name"}` (or: `Account.Order[0].Product[0]."Product Name"`)

Get a list of all names of ordered products: `{"products": Account.Order.Product.( $."Product Name")}` or: `Account.Order.Product.( $."Product Name")`  

Total number of items in all orders in the account: `Account.$sum(Order.Product[]."Quantity")`                           

Average height of all items: `$average(Account.Order.Product."Description"."Height")`

A document with some aggregate values:
```
{ "total number of items": Account.$sum(Order.Product[]."Quantity") 
, "total cost": $sum(Account.Order.Product.(Price * Quantity))
, "average height":$average(Account.Order.Product."Description"."Height")
, "longest product name": $max(Account.Order.Product."Description".$length("Product Name"))
}
```

A nicely transformed orders document:
```
Account.Order. 
{"order": { "id": OrderID
          , "products": $.Product[]. {"name": $."Product Name"
                                     ,"price": $."Price"
                                     ,"colour" : $."Description".Colour
                                     } 
          ,"numberOfItems" : $sum($.Product[]."Quantity")                           
          }
}
```

### Run JSONata Exerciser locally

The Webapplication to try out JSONata is available on GitHub at: https://github.com/jsonata-js/jsonata-exerciser.

You can run this application locally with the following steps:
1. Run a container with Node runtime:
```
docker run -it --rm -p 8080:3000 node:10 bash
```
2. Clone the GitHub Repository for JSONata Exerciser:
```
git clone  https://github.com/jsonata-js/jsonata-exerciser
```
3. Start the application 
cd jsonata-exerciser
rm package-lock.json
npm install
npm start
```

The JSONata exerciser can then be accessed in a browser on your laptop at port 8080: `127.0.0.1:8080` or at the IP address assigned to the VM running the Docker engine: `http://192.168.188.142:8080` 

## Use JSONdata from Node JS
JSONata has been implemented in JavaScript and can be used in a browser client as well as in a server side Node JS application. Here we will take a look at the latter.

To run a clean Node environment, execute the following command: 
`docker run -it --rm -p 8080:8080 -v "$PWD":/usr/src/app  node:10 bash`

This runs a container with the Node 10 run time environment, with a mapping of the current working directory into the directory /usr/src/app inside the container and with port 8080 in the container exposed at port 8080 on the Docker host. This allows us to run a Node application that can handle HTTP requests at port 8080. 

Note: if you are working in a `vagrant ssh` shell, you may want to copy the directory jsonata-query-and-transform-json-documents into the directory that contains the Vagrantfile. This makes the directory available inside the Linux environment under /vagrant. If you run the docker node container from this /vagrant directory, then you will have the Node application sources available inside the container - in the mounted /usr/src/app directory. Copy this mounted, read-only directory to a read-write container owned directory: `cp -r /usr/src/app /app` and work in the /app directory.

Check out how jsonata is used in `explore-oracleopenworld-catalog.js` to extract data from the JSON document `oow2018-sessions-catalog.json`.

Before you can run explore-oracleopenworld-catalog.js, you first need to run `npm install` to have npm module jsonata installed.

### Exploring Country Data
The document https://github.com/mledoze/countries/blob/master/countries.json contains country data in JSON format. We can explore this data using JSONata.

Check out the contents of `explore-countries.js`. You can run this file with `node explore-countries.js`. It will load the JSON document and perform a number of data extractions from that document.

Note for example how enrichment can be done - by composing a source document from multiple data sets and transforming that composite source with a single (or multiple) JSONata expression(s).

Also note the use of variables that can help manage complex queries and transformations in a elegant, understandable way; see the comparison between Netherlands and Belgium.

### Country Server
The Node files `json-server.js` and `countries-module.js` together create a very simple HTTP service for providing country details. The service accepts http GET requests with query parameters region (Europe, Asia, Africa, Americas, ...) and name (optional). The service returns a JSON document with for all countries in the indicated region and whose name satisfies the optional name filter, their name and capital city.

To start the HTTP service, simply run `node json-server.js'.  The HTTP server listens at port 8080, the port that is exposed from the container and mapped to port 8080 on the Linux server.

Access the service from Linux (for example with Curl) or in your browser - at the IP address of the Linux Docker Host (when on Windows, that is the IP address specified in the Vagrant file, for example: 192.168.188.142)

For example on Linux: `curl 'http://localhost:8080/?name=ra&region=Europe'`

From the browser: `http://192.168.188.142:8080/?name=x&region=Americas`

## Resources
Homepage for JSONata: http://jsonata.org/
Documentation for JSONata: http://docs.jsonata.org/ 
npm module for JSONata: https://www.npmjs.com/package/jsonata 
GitHub Repo: https://github.com/jsonata-js/jsonata 

Support for JSONata in Elastic Stack: https://www.elastic.io/jsonata-transformation-language-building-complex-workflows/ 