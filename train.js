// module dependencies
var http = require('http')
var qs = require('querystring')

var pluralize = require('pluralize')
var func = require('./functions.js')

// var userInput, userTraining
var dir = "./avm/"
var output = "Hello world"

var allowedIPs = []
allowedIPs["server"] = "104.248.71.117"
allowedIPs["home"] = "69.138.219.145"

const hostname = '104.248.71.117'
const port = 3001

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  console.log(req.connection.remoteAddress)

  var authorizedIP = false
  for (ip in allowedIPs) {
    if (allowedIPs[ip] == req.connection.remoteAddress) {
      authorizedIP = true
    }
  }

  if (authorizedIP) {
    if (req.method == "POST") {
      console.log('post')
      // testing via get right now
    }

    // change to post...
    if (req.method == "GET") {
      var tmpURL = req.url.replace("/?","")
      var querystring = qs.parse(tmpURL)

      if (querystring.word && querystring.category) {
        var word = pluralize.singular(querystring.word.toLowerCase())
        var cat = querystring.category.toLowerCase()

        switch (cat[0]) {
          case "a":
            func.writeFile("animal", word)
            console.log("animal")
            // log to animals file
            break
          case "v":
            func.writeFile("vegetable", word)
            console.log("vegetable")
            // log to vegetables file
            break
          case "m":
            func.writeFile("mineral", word)
            console.log("mineral")
            // log to minerals file
            break

          // discard incorrect categories
        }

        output = "Trained '" + word + "' in " + cat
      }
    }
  } else {
    output = "Unauthorized IP Address"
  }

  res.end(output);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

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
