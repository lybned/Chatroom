const { register, login, allUsers, currentUser } = require("../controller/userController");
const express = require('express');
const router = express.Router();

// Define routes


router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of user ${userId}`);
});

router.get('/users', allUsers);
router.get('/user', currentUser)
router.post('/user', register);
router.post('/signin', login);


router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update user ${userId}`);
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete user ${userId}`);
});

module.exports = router;