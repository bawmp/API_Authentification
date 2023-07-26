//Les importations

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authenticateToken = require('./middlewares/authenticateToken');
const userController = require('./controllers/userController');

//L'application express
const app = express();
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://williambita:lacolonnedefeu@cluster0.ku1zfhp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Erreur de connexion à la base de données', err));

// Routes liées aux utilisateurs
app.use('/users', userRoutes);

// Route pour la déconnexion d'un utilisateur
app.post('/logout', authenticateToken, userController.logout);

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});