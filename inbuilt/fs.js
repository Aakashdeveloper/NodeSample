let fs = require('fs');
/*
fs.writeFile('mytext.txt',"I am from India",function(){
    console.log('File Created')
})*/

/*
fs.appendFile('myCode.txt',"This is line number 1 \n",function(){
    console.log('File Created')
})
*/

/*
fs.readFile('../testapp/package.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})*/


/*Delete File 
fs.unlink('mytext1.txt',function(err){
    if(err) throw err;
    console.log('File Deleted')
})*/

fs.rename('myCode.txt','yourCode.txt',function(err){
    if(err) throw err;
    console.log('File Renamed')
})