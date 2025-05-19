const express = require('express');
const {handleUserSignUp, handleUserLogin} = require('../controllers/users')
const router = express.Router();

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/login', (req, res) =>{
    return res.render("login");
});

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;