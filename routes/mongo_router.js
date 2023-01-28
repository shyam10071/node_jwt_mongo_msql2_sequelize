const express = require('express');
const router = express.Router();
const {register,login,post} = require('../controllers/mongo_controller')
const  {auth} = require('../middleware/auth')
router.post('/register', register);
router.post('/login', login);
router.post('/post',auth, post);


module.exports = router;