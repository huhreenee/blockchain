const fs  = require('fs')
const path = require('path')

const fullPath = path.join(__dirname, 'block_file')

read_object()

function read_object(){
    // let fpath = './block_file/'
    // fs.readdir(fullPath, print(fpath))
    fs.readdir(fullPath, (error, files) => {
        // if (error) console.log(error)
        files.forEach( file => console.log(file))
    })
}

function print(word){
    console.log(word)
}