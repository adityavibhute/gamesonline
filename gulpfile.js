var gulp = require('gulp');
var fs = require('fs');
var dir = './view';
var readline = require('readline');

gulp.task('myTask', function(attr){
    var i, eachFile, myInterface;
    fs.readdir(dir , function(err, files){
        for(i in files){
            eachFile = dir + '/' + files[i];
            myInterface = readline.createInterface({
                input: fs.createReadStream(eachFile)
            });
            lineno = 0;
            myInterface.on('line', function (line) {
                lineno++;
                if(line.indexOf("paypal.com") > -1){
                    console.log("Implement PPlinking at " + lineno + files[i] + line);                
                }
            });
        }
    })
})