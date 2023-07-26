const User = require('./models/User');
const mongoose = require('mongoose');


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://williambita:lacolonnedefeu@cluster0.ku1zfhp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Erreur de connexion à la base de données', err));



const createUser = async () => {
    try {
      const user = new User({
        username: 'john_doe',
        password: 'password123',
        email: 'john.doe@example.com'
      });
  
      await user.save();
      console.log('Utilisateur créé avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
  };
  
  // Appel de la fonction pour créer un utilisateur
  createUser();