const { register, login, allUsers } = require("../controller/messageController");
const express = require('express');
const router = express.Router();


router.get('/message', getAllMesage)
router.post('/message', addMesage)