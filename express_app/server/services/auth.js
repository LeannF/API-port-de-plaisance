const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        let isMatch;
        try {
            isMatch = await bcrypt.compare(password, user.password);
            console.log(password, user.password)
        } catch (bcryptError) {
            return res.status(500).json({ message: "Erreur lors de la vérification du mot de passe", error: bcryptError });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        } catch (jwtError) {
            return res.status(500).json({ message: "Erreur lors de la génération du token", error: jwtError });
        }

        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Connexion réussie", token });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

exports.logout = async(req, res) => {
    res.clearCookie("token");
    res.json({ message: "Déconnexion réussie" });
}
