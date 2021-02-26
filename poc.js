// module dependencies
var http = require('http')
var dclassify = require('dclassify')

var prompt = require('prompt-sync')()
var pluralize = require('pluralize')
var func = require('./functions.js')

// Utilities provided by dclassify
var Classifier = dclassify.Classifier
var DataSet    = dclassify.DataSet
var Document   = dclassify.Document

// var userInput, userTraining
var dir = "./avm/"

const hostname = '104.248.71.117'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  var output = "Null"
  var tmp = req.url.split("/?q=")
  if (tmp[1]) {
      var wordFromURL = tmp[1]
      console.log(wordFromURL)

      output = avm(wordFromURL)
  }
  
  res.end(output);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function avm(word) {
    var animalsFromFile = []
    var vegetablesFromFile = []
    var mineralsFromFile = []

    var animalsFromFile = func.readFile("avm/animals.txt")
    var vegetablesFromFile = func.readFile("avm/vegetables.txt")
    var mineralsFromFile = func.readFile("avm/minerals.txt")

    // create some 'good' test items (name, array of characteristics)
    var itemAnimals = new Document('animalsFromFile', animalsFromFile)
    var itemVegetables = new Document('vegetablesFromFile', vegetablesFromFile)
    var itemMinerals = new Document('mineralsFromFile', mineralsFromFile)
    var itemUnknown = new Document('unknown',[])

    // create a DataSet and add test items to appropriate categories
    // this is 'curated' data for training
    var data = new DataSet()
    data.add('unknown', itemUnknown)
    data.add('animal', itemAnimals)    
    data.add('vegetable', itemVegetables)
    data.add('mineral', itemMinerals)

    // an optimisation for working with small vocabularies
    var options = {
        //applyInverse: true
    }

    // create a classifier
    var classifier = new Classifier(options)

    // train the classifier
    classifier.train(data)
    //console.log('Classifier trained.')
    //console.log(JSON.stringify(classifier.probabilities, null, 4))

    //userInput = prompt('Animal, Vegetable, or Mineral? ')
    //userInput = pluralize.singular(userInput)

    word = pluralize.singular(word)

    console.log('Ok. Classifying \"' + func.sentenceCase(word) + '\": ')

    // test the classifier on a new test item
    var testDoc = new Document('testDoc', word.toLowerCase())    
    var result1 = classifier.classify(testDoc)
    
    var output = func.sentenceCase(result1.category)
    // report to the user
    console.log(result1)
    console.log(output)

    return output

}

function train(word, category) {
    //userTraining = prompt('Was that right? y/n/quit ')
    func.writeFile(word, category, "avm")
}

/*
while ((userTraining != "q") && (userTraining != "quit")) {
    var animalsFromFile = []
    var vegetablesFromFile = []
    var mineralsFromFile = []

    var animalsFromFile = func.readFile("avm/animals.txt")
    var vegetablesFromFile = func.readFile("avm/vegetables.txt")
    var mineralsFromFile = func.readFile("avm/minerals.txt")

    // create some 'good' test items (name, array of characteristics)
    var itemAnimals = new Document('animalsFromFile', animalsFromFile)
    var itemVegetables = new Document('vegetablesFromFile', vegetablesFromFile)
    var itemMinerals = new Document('mineralsFromFile', mineralsFromFile)
    var itemUnknown = new Document('unknown',[])

    // create a DataSet and add test items to appropriate categories
    // this is 'curated' data for training
    var data = new DataSet()
    data.add('unknown', itemUnknown)
    data.add('animals', itemAnimals)    
    data.add('vegetables', itemVegetables)
    data.add('minerals', itemMinerals)

    // an optimisation for working with small vocabularies
    var options = {
        //applyInverse: true
    }

    // create a classifier
    var classifier = new Classifier(options)

    // train the classifier
    classifier.train(data)
    //console.log('Classifier trained.')
    //console.log(JSON.stringify(classifier.probabilities, null, 4))

    userInput = prompt('Animal, Vegetable, or Mineral? ')
    userInput = pluralize.singular(userInput)

    console.log('Ok. Classifying \"' + func.sentenceCase(userInput) + '\": ')

    // test the classifier on a new test item
    var testDoc = new Document('testDoc', userInput.toLowerCase())    
    var result1 = classifier.classify(testDoc)
    
    // report to the user
    //console.log(result1)
    console.log(func.sentenceCase(result1.category))

    userTraining = prompt('Was that right? y/n/quit ')

    var firstLetter = userTraining[0]
    switch (firstLetter) {
        case "y": 
            func.writeFile(result1.category, userInput, dir)
            break
        case "n":
            var tmpInput = prompt("What is the right category? ")
            func.correctFile(tmpInput, userInput, dir)            
            break
        default:
            console.log("No action taken.")
    }
} 

*/
