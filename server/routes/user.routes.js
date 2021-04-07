//? Récupération des router de express afin d'assurer que les routes soit servies sur des url qu'on définit
const router = require('express').Router();
const bcrypt = require('bcryptjs');

//? La dépendance jsonwebtoken qui permet de créer des json web token, mais aussi de les utiliser
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

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

//? Rajouter la route /login, qui sert à se connecter sur notre server
router.post('/login', async (req,res)=>{
    
    //? 3 étapes: 
    //?1. vérifier qu'un utilisateur possède cette adresse
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(404).send({
            message:'User not found'
        })
    }

    //? 2. vérifier que le mdp est valide
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(404).send({
            message:'Invalide credentials'
        })
    }
    //? 3. créer un token de session
    const token = jwt.sign({_id:user._id}, "secret");

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  // 1 day in ms
    })

    res.send({
        message:'Authentification success'
    });
})

//? La route / va servir de route qui récupère mes infos de l'utilisateur authentifié.
router.get('/', async (req,res)=>{
    try {
        
        const cookie = req.cookies['jwt']

        const claims = await jwt.verify(cookie, 'secret');
        if(!claims) {
            return res.status(401).send({
                message: 'Not authenticated'
            })
        }
        const user = await User.findOne({_id:claims._id});
        const {password, ...data} = await user.toJSON(); 

        res.send(data);

    } catch (error) {
        return res.status(401).send({
            message: 'Not authenticated'
        })
    }
})

router.post('/logout', (req,res)=>{
    res.cookie('jwt', '', {maxAge:0});

    res.send({
        message:'Successfully logged out'
    })
})
module.exports = router;