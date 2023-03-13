const sha256 = require('js-sha256')

class Transaction {
    constructor(from, to, amount) {
        this.from = from 
        this.to = to
        this.amount = amount 
        this.txnHash = sha256(from+to+amount)
    }

}

module.exports = Transaction 