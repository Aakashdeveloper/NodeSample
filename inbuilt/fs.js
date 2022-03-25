let fs = require('fs');

fs.writeFile('mytext.txt',"My Node Fs package",function(){
    console.log('File Created')
})