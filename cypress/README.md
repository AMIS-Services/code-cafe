# Cypress.io

In order to deploy an app to production with confidence, automated testing is a necissity.
Using browser-based intregration testing has some major advantages:

- unit tests / snapshot tests for front end often tend implementation over functionality
- large amounts of code are hit with small amounts of testing

Up until now Selenium was the tool of choice, but it is being challende by Cypress.
Cypress is very simple to use, comes with a bundle set of tools and is completely standalone, alieviating the need to fiddle with webdriver.
Some of the included tools are Mocha with helpers such as beforeEach, describe, context etc, Chai for assertions and Sinon for stubs and spies.

## Getting started

Running the demo:

- cd into koa
- `yarn start`
- `yarn seed`
- cd into react
- `yarn start`
- new terminal window, same path
- `yarn cypress`

The test files are found in code-cafe/react/cypress/integration

Try it for yourself:
In an existing project, run `npm install cypress` and then run `cypress open`.
This will add several folders and files, including some examples of what's possible with cypress.

## Features

- open source
- fast
- easy to write and debug
- built for responsiveness testing
- spies, stubs, clocks
- direct manipulation of data management solutions (e.g. redux)
- screenshots and video of failing tests
- excellent documentation

## Resources

main site: https://www.cypress.io/
docs: https://docs.cypress.io/
source code: https://github.com/cypress-io/cypress
npm page: https://www.npmjs.com/package/cypress
