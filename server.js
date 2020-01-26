// load Express.js
const express = require('express')
const app = express()

// load bodyParser module for json payload parsing
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
db = client.db('labs')
})

// get the collection name
app.param('users', (req, res, next, collectionName) => {
req.collection = db.collection(collectionName)
// console.log('collection name:', req.collection)
return next()
})

// dispaly a message for root path to show that API is working
app.get('/', function (req, res) {
res.send('Select a collection, e.g., /collections/users')
})

// retrieve all the objects from an collection
app.get('/collections/:users', (req, res) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
console.log('here are the results:')
console.log(results)
res.send(results)
})
})


// add a users
app.post('/collections/:users', (req, res, next) => {
// TODO: Validate req.bodyre
req.collection.insert(req.body, (e, results) => {
if (e) return next(e)
res.send(results.ops)
})
})

// retrieve a lesson by mongodb ID
const ObjectID = require('mongodb').ObjectID;
app.get('/collections/:users/:id', (req, res, next) => {
console.log('searching json object with id:', req.params.id)
req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)
res.send(result)
})
})

// update a lesson by ID
app.put('/collections/:users/:id', (req, res, next) => {
req.collection.update({ _id: new ObjectID(req.params.id) },
{ $set: req.body },
{ safe: true, multi: false }, (e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
})
})

// delete a lesson by ID
app.delete('/collections/:users/:id', (req, res, next) => {
req.collection.deleteOne({ _id: ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
})
})
app.listen(3000)


