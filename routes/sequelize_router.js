const express = require('express');
const router = express.Router();
const {register,login,post} = require('../controllers/sequelize_controller')
const  {auth} = require('../middleware/auth_sequelize')
router.post('/register', register);
router.post('/login', login);
router.post('/post',auth, post);


module.exports = router;