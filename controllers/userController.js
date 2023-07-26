// Les controleurs pour l'utilisateur

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Endpoint pour l'inscription d'un utilisateur

exports.signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      }
  
      // Hacher le mot de passe de l'utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créer un nouvel utilisateur avec le mot de passe haché
      const user = new User({ username, email, password: hashedPassword });
  
      await user.save();
  
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur' });
    }
  };

// Endpoint pour l'authentification d'un utilisateur
// Endpoint de login
exports.login =  async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Recherche de l'utilisateur dans la base de données
      const user = await User.findOne({ username });
  
      // Vérification si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
  
      // Création du token JWT
      const token = jwt.sign({ userId: user._id }, 'secretKey');
  
      // Renvoi du token au client
      res.json({ token });
    } catch (error) {
      console.error('Erreur lors de l\'authentification', error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  };
  

// Endpoint pour la déconnexion d'un utilisateur
exports.logout = (req, res) => {
    try {
      // la logique de déconnexion de l'utilisateur ici consiste 
      //simplement à supprimer les cookies contenant le token de connexion
      res.clearCookie('token');
  
      res.json({ message: 'Déconnexion réussie' });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion de l\'utilisateur' });
    }
  };