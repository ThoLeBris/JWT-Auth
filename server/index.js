const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');

//? DB Connection
//TODO : Ajouter la connection dans un fichier séparé qui servira de module de connection.
mongoose.connect('mongodb://localhost/jwt_auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, ()=>{
    console.log('connected to MongDB');
});

//TODO: Créer un fichier .env qui contient les variables d'environnement comme l'Url de connexion
const app = express();
app.use(express.json());

//? Routes
app.use('/api/user', userRoutes);

app.listen(8000);