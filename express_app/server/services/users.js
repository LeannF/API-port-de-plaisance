const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.getByEmail = async(req, res) => {
    const email = req.params.email

    try{
        let user = await User.findOne({email});
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('User not found');
    }catch (error){
        return res.status(501).json("Invalid user ID format");
    }
}

exports.getAllUsers = async() => {
    try {
        return await User.find().lean();
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return [];
    }
}

exports.add = async(req, res) => {
    try{
        const { userName, email, password } = req.body;

        const newUser = ({
            userName    : req.body.userName, 
            email       : req.body.email,
            password    : req.body.password,  
        });
        await User.create(newUser);
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async (req, res) => {
    const email = req.params.email;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        /** Mise à jour des champs uniquement si une nouvelle valeur est fournie */ 
        if (req.body.userName) user.userName = req.body.userName;
        if (req.body.email) user.email = req.body.email;

        /** Si un mot de passe est fourni, on le hash avant de le stocker */ 
        if (req.body.password) {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(req.body.password, salt);
        }
        await user.save(); 

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.delete = async(req, res) => {
    try{
        await User.deleteOne({email: req.params.email});
        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}