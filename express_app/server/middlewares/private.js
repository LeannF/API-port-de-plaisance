const jwt = require('jsonwebtoken');
const User = require('../models/user')
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    const token = req.cookies.token;  // Récupérer le token depuis les cookies
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.user = decoded;  // Ajoute l'utilisateur décodé à la requête
        next();  // Continue le processus
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');  // Redirige vers la connexion si pas de session
    }
    next();
};

/*exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("📩 Email reçu:", email);
    console.log("🔑 Mot de passe reçu:", password);

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    return res.status(500).json({ error: "Erreur interne du serveur" });
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: expireIn });

                    res.cookie("token", token, { httpOnly: true }); // Stocke le token en cookie sécurisé
                }

                return res.status(403).json({ error: 'wrong_credentials' });
            });
        } else {
            return res.status(404).json({ error: 'user_not_found' });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error });
    }
};*/