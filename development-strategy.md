# Restful-Courses: development strategy

## 0. README

- The aim of the project
- Screenshot will be added.

---

## 1. Express

- Created express-demo folder
- Inited `npm`(created courses.json in terminal)
- Installed express

---

## 2. Nodemon

- Created index.js
- Used get method
- Installed nodemon

## 3. Environment Variables

- Changed `port` (environment variable) as an `process.env` to use more appropriate

## 3. Route parameters

- Created route with 2 primeters.

* Used params esential and required values.
* Used query string primeters to provide additional data for a back-end-services

## Handling get requests

- Created 3 courses with id params to respond the clients
- If this page is not available and so status 404, the clients will see a massage

## Handling post requests

- Creatde post request for courses

* tested with `postman`

## Input validation

- installed `joi`
- specialities of value of keys are defined with `joi` and messages send automatically from the `joi`

## Handling put requests

- Created `put` request with its validation and send request.

## Handling Delete requests

- Created `delete` request and result sended to the client

## Fixing a bug

- Do early error return and make code cleaner

## Reading and writing "courses.json"

- Added fs.readFile and fs.writeFile
