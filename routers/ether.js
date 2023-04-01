const router = require('express').Router();
const app = require('../app');
const { getMyEther, getEthFromCust } = require('../controllers/etherController');
router.get('/balance/getMyBalance', getMyEther);
router.get('/balance/getOtherEther/:address', getEthFromCust);
module.exports = router;