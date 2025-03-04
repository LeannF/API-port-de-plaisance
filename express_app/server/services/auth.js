const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        console.log("📩 Requête reçue:", req.body);

        const { email, password, userName } = req.body;
        if (!email || !password) {
            console.log("⚠️ Email ou mot de passe manquant");
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Utilisateur non trouvé");
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Mot de passe incorrect");
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Stocker l'utilisateur dans la session
        req.session.user = { id: user._id, email: user.email, name: user.userName };
        console.log("📌 Session après connexion:", req.session);

        console.log("✅ Connexion réussie, redirection vers /board");

        return res.redirect('/board'); // Rediriger après connexion

    } catch (error) {
        console.error("💥 Erreur serveur:", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};



exports.logout = async(req, res) => {
    res.clearCookie("token");
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.redirect('/');
    });
}
