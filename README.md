# Getting Started with URL Shortener

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start the app with `npm start` script

`npm start` starts running the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run tests with `npm run cypress:open` script

cypress.io is used for automated tests.
https://www.cypress.io/

`npm run cypress:open` opens Cypress test runner.\
Test specs are located in /cypress/integration folder. 

### app.spec.js
It contains integration tests which run without calling api

### e2e.spec.js
It contains end to end tests which calls actual api. It is separated from app.spec.js since it slows and should not have to run on every change.


## Decision made during development
1. Paging, sort, and filter are not implemented in a list of shortened URLs since GET endpoint only returns all links
2. No error or warning is thrown when adding same URL since POST endpoint returns success status
3. URL input needs to have http or https protocol
4. Slug input has max length validation since it's supposed to shorten url
5. Slug input validation allows only alphanumeric, hyphen, and underscore in order to make short_url simple

