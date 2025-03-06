const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        /** Stocke l'utilisateur dans la session */ 
        req.session.user = { id: user._id, email: user.email, name: user.userName };
        return res.redirect('/board');

    } catch (error) {
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