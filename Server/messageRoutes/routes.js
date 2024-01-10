const { getAllMesage, addMesage } = require("../controller/messageController");
const express = require('express');
const router = express.Router();


router.get('/messages', getAllMesage)
router.post('/message', addMesage)


module.exports = router;