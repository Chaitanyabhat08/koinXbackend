const mongoose = require('mongoose');
const balance = new mongoose.Schema({
  blockNumber:
    String,
  timeStamp:
    String,
  hash:
    String,
  nonce:
    String,
  blockHash:
    String,
  transactionIndex:
    String,
  from:
    String,
  to:
    String,
  value:
    String,
  gas:
    String,
  gasPrice:
    String,
  isError: 
  String,
  txreceipt_status:
    String,
  input:
    String,
  contractAddress:
    String,
  cumulativeGasUsed:
    String,
  gasUsed:
    String,
  confirmations:
    String
});

module.exports = mongoose.model("Balance", balance);