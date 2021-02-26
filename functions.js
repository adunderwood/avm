var fs = require('fs')
var pluralize = require('pluralize')

var self = module.exports = {

    sentenceCase: function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    },    
    readFile: function(file) {
        if (file) {
            var arr
            arr = fs.readFileSync(file).toString().split("\n");
                for(i in arr) {
                    tmp = arr[i] 
                    arr[i] = tmp.replace("\r","")
                }
            return arr    
        }
    },
    writeFile: function (data, category, dir) {
        var directory = "avm"
        var file = correctFile(category)

        console.log("Writing to training file")
        var file = "./" + directory + "/" + file + ".txt"
    
        //console.log("Writing " + data.toLowerCase() + " to file " + file)
        data = pluralize.singular(data)
        fs.appendFileSync(file, "\n" + data.toLowerCase())
    },
    correctFile: function(category) {
        var dir
        switch(category[0]) {
            case "a":
                dir = "animals"
                break
            case "v":
                dir = "vegetables"
                break
            case "m": 
                dir = "minerals"
                break
            default:
                dir = "unknown"
        }
    
        return dir
        //console.log("Corrected file = " + file)
        //self.writeFile(file, data, dir)
    }
}