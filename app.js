const prompt = require("prompt-sync")({ sigint: true });
const Block = require('./block')
const sha256 = require('js-sha256')
const cryptico = require('cryptico');
const fs  = require('fs')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const path = require('path')

const bits = 1024
const MAX_TXN=2;
let input = ''
let block = new Block()
// block.addTransaction(new Transaction(sha256('id'),sha256('admin'),99999999))
let blockchain = new Blockchain(block)
let txns = []

const block_file_path = path.join(__dirname, 'block_file')

let account_holders = {}


function read_object(){
    // let fpath = './block_file/'
    fs.readdir(block_file_path, (error, files) => {
        files.forEach( file => {
            // console.log(file)
            // path.join(block_file_path, file)
            blockchain.addBlock(fs.readFileSync(path.join(block_file_path, file),
            {encoding:'utf8', flag:'r'}))
        })
    })
    // fs.writeFileSync(block_file_path
    //     fs.readdir(directory_path, callback_function)
    console.log(blockchain)
    console.log('ddd')
}

read_object()


// function create_object(blocks){
//     let fpath = './block_file/'
//     blocks.forEach(block => {
//         fs.writeFileSync(fpath.concat(sha256(JSON.stringify(block))) ,JSON.stringify(block),'utf-8')
//         // fs.writeFileSync(str(fpath + sha256(block)),JSON.stringify(blocks),'utf-8')
//     });
// }



// do{
//     debitAccount = prompt('Debit account:')
//     creditAccount = prompt('Credit account:')
//     if(!(debitAccount in account_holders) && debitAccount !== 'admin'){
//         account_holders[debitAccount] = rsakey(debitAccount)
//     }

//     if(!(creditAccount in account_holders)){
//         account_holders[creditAccount] = rsakey(creditAccount)    
//     }

//     creditAccount_pkey = account_holders[creditAccount]

//     if(debitAccount !== 'admin'){
//         debitAccount_pkey = account_holders[debitAccount]
//     }
//     else {
//         debitAccount_pkey = debitAccount
//     }

//     amount = parseInt(prompt('Amount:'))
//     if(isNaN(amount) || amount <=0){
//         console.log('Invalid amount, please try again')
//         continue;
//     }
//     let accountBalance = findAccountBalance(blockchain.blocks,sha256(debitAccount_pkey))+findAccountBalanceForBlock(txns,sha256(debitAccount_pkey))
//     if(accountBalance<amount){
//         console.log('Invalid transaction, please try again')
//         continue;
//     }
//     let transaction = new Transaction(sha256(debitAccount_pkey),sha256(creditAccount_pkey) , amount)
//     txns.push(transaction)
//     if(txns.length>=MAX_TXN){
//         block = blockchain.getNextBlock(txns)
//         blockchain.addBlock(block)
//         block = new Block()
//         txns = []
//     }
// input = prompt('Any more transactions?')
// }while(input!=='');
// if(txns.length!=0){
//     block = blockchain.getNextBlock(txns)
//     blockchain.addBlock(block)
//     txns = []
// }

// if(blockchain.blocks != 'undefined' ){
//     create_object(blockchain.blocks);
// }

function create_object(blocks){
    // let fpath = './block_file/'
    blocks.forEach(block => {
        fs.writeFileSync(block_file_path.concat(sha256(JSON.stringify(block))) ,JSON.stringify(block),'utf-8')
        // fs.writeFileSync(str(fpath + sha256(block)),JSON.stringify(blocks),'utf-8')
    });
    // fs.writeFileSync('asdf',JSON.stringify(blocks),'utf-8')
    // var fpath = './block_file'
    // var myFilePath = fpath + "/" + 'Harriirrrrr';
    // var myFile = new File(myFilePath).saveDlg("Export as", "Adobe Illustrator files:*.ai");
    // console.log('BCCCCCCCCCCCCCCBCCCCCCCCCCCBCCCCCCCCC')
    // console.log(fpath)
    // blocks.forEach((block) => {
    //     // block_obj =  window.localStorage.setItem(sha256(block), JSON.stringify(block));
    //     console.log(block)

    // })

}


function findAllAccounts(blocks){
    let  accounts = {};
    for(let block of blocks){
        for(let txn of block.transactions){
            accounts[txn["from"]]=true;
            accounts[txn["to"]]=true;
        }
    }
    return Object.keys(accounts);
}

function findAccountBalance(blocks,accountName){
    if(accountName==='8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'){
        return 100000
    }
    let accountBalance = 0;
    for(let block of blocks){
        for(let txn of block.transactions){
            if(txn["from"]===accountName){
                accountBalance-=txn["amount"]
            }
            if(txn["to"]===accountName){
                accountBalance+=txn["amount"]
            }
        }
    }
    return accountBalance;
}
function findAccountBalanceForBlock(transactions,accountName){
    if(accountName==='8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'){
        return 100000
    }
    let accountBalance = 0;
        for(let txn of transactions){
            if(txn["from"]===accountName){
                accountBalance-=txn["amount"]
            }
            if(txn["to"]===accountName){
                accountBalance+=txn["amount"]
            }
        }
        
    
    return accountBalance;
}
// let anotherTransaction = new Transaction('Steven', 'Brian', 500)
// let block1 = blockchain.getNextBlock([anotherTransaction, transaction])
// blockchain.addBlock(block1)

function rsakey(username){
    private_key = cryptico.generateRSAKey(username, bits)
    public_key = cryptico.publicKeyString(private_key)
    return public_key
};

console.log(JSON.stringify(blockchain,null,4))
console.log('Balance sheet')
const accountnames = findAllAccounts(blockchain.blocks)
for(let account of accountnames){
    console.log(account+' = ' +findAccountBalance(blockchain.blocks,account))
}

console.log(account_holders)