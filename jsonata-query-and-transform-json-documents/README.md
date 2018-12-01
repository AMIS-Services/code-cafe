# Explore JSONata

JSONata is a lightweight query and transformation language for JSON data. It reminds me of XPath and XSLT or XQuery. Queries and transformations can be expressed in JSONata using declarative and intuitive syntax (for example: expression Account.Order[0].OrderID to quert the OrderID property of the first Order element in an Account object). The npm module `jsonata` provides a JavaScript implementation that can be used in Node JS and in client side browser code. 

Try out JSONata in the live browser based JSONata explorer:  http://try.jsonata.org/ 

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

## Use JSONdata from Node JS
JSONata has been implemented in JavaScript and can be used in a browser client as well as in a server side Node JS application. Here we will take a look at the latter.

To run a clean Node environment, execute the following command: 
`docker run -it --rm -p 8080:8080 -v "$PWD":/usr/src/app  node:10 bash`

This runs a container with the Node 10 run time environment, with a mapping of the current working directory into the directory /usr/src/app inside the container and with port 8080 in the container exposed at port 8080 on the Docker host. This allows us to run a Node application that can handle HTTP requests at port 8080. 

Note: if you are working in a `vagrant ssh` shell, you may want to copy the directory jsonata-query-and-transform-json-documents into the directory that contains the Vagrantfile. This makes the directory available inside the Linux environment under /vagrant. If you run the docker node container from this /vagrant directory, then you will have the Node application sources available inside the container - in the mounted /usr/src/app directory. Copy this mounted, read-only directory to a read-write container owned directory: `cp -r /usr/src/app /app` and work in the /app directory.

Check out how jsonata is used in explore-oracleopenworld-catalog.js to extract data from the JSON document oow2018-sessions-catalog.json.

Before you can run explore-oracleopenworld-catalog.js, you first need to run `npm install` to have npm module jsonata installed.

### Exploring Country Data
The document https://github.com/mledoze/countries/blob/master/countries.json contains country data in JSON format. We can explore this data using JSONata.

Check out explore-countries.js. 

## Resources
Homepage for JSONata: http://jsonata.org/
Documentation for JSONata: http://docs.jsonata.org/ 
npm module for JSONata: https://www.npmjs.com/package/jsonata 
GitHub Repo: https://github.com/jsonata-js/jsonata 

Support for JSONata in Elastic Stack: https://www.elastic.io/jsonata-transformation-language-building-complex-workflows/ 