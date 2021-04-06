const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

router.get('/', (req,res)=>{
    res.send('Hello from user');
});

router.post('/register', async (req,res)=>{

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    const result = await user.save();
    const {password, ...data} = await result.toJSON(); 
    // ici on extrait le password de la réponse

    res.send(data);
})

module.exports = router;