const express = require('express');
const router = express.Router();
const {register,login,post} = require('../controllers/mysql2_controller')
const  {auth} = require('../middleware/auth_mysql2')
router.post('/register', register);
router.post('/login', login);
router.post('/post',auth, post);


module.exports = router;