const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });
const etherModel = require("../models/etherDetails");
const etherBalanceModel = require("../models/etherBalance");
module.exports.getMyEther = async (req,res) => {
  try {
    const eth = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API}`);
    const results = eth.data.result;
    results.forEach((element) => {
      const balanceSheet = new etherModel({
        blockNumber: element.blockNumber,
        timeStamp: element.timeStamp,
        hash: element.blockHash,
        nonce: element.nonce,
        blockHash: element.blockHash,
        transactionIndex: element.transactionIndex,
        from: element.from,
        to: element.to,
        value: element.value,
        gas: element.gas,
        gasPrice: element.gasPrice,
        isError: element.isError,
        txreceipt_status: element.txreceipt_status,
        input: element.input,
        contractAddress: element.contractAddress,
        cumulativeGasUsed: element.cumulativeGasUsed,
        gasUsed: element.gasUsed,
        confirmations: element.confirmations
      });
      balanceSheet.save();
    });
    console.log('data saved');
    res.status(201).json({
      success: true,
      data: eth.data.result,
    });
  } catch (error) {
    console.error("hey could not get your balanceSheet yo");
    res.status(500).json({
      error: error
    });
  }
}

module.exports.getEthFromCust = async (req,res) => {
  try {
    // Find transactions where user is either sender or receiver
    const txList = await etherModel.find({
      $or: [{ from: req.params.address }, { to: req.params.address }],
      isError: '0',
      txreceipt_status: '1',
      contractAddress: ''
    });

    // Calculate balance of user
    let balance = 0;
    for (let i = 0; i < txList.length; i++) {
      const tx = txList[i];
      if (tx.from === req.params.address) {
        balance -= parseFloat(tx.value);
      } else {
        balance += parseFloat(tx.value);
      }
    }
    // Fetch current ETH price
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`);
    const ethPrice = response.data.ethereum.inr;
    const balanceObject = new etherBalanceModel({
      balance: ethPrice
    })
    balanceObject.save();
    res.send({ balance, ethPrice });
  } catch (error) {
    console.error('Error fetching user balance and ETH price:', error);
    res.status(500).send('Error fetching user balance and ETH price');
  }
}

// https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=PTQDV7YUWT1CSSXU9UC66DS4GG2XFSR7KJ

//https://api.etherscan.io/api?module=account&action=txlist&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=PTQDV7YUWT1CSSXU9UC66DS4GG2XFSR7KJ