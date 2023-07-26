// Vérification des tokens de connexion

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token d\'authentification requis' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token d\'authentification invalide' });
    }

    req.user = user; // Ajoutez le user extrait du token à req.user
    next();
  });
}

module.exports = authenticateToken;