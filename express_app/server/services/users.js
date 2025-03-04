const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getByEmail = async(req, res, next) => {
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
exports.getAllUsers = async(req, res, next) => {
    try {
        return await User.find().lean();  // Retourne directement les catways
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}


exports.add = async(req, res, next) => {
    try{
        const { userName, email, password } = req.body;

        const newUser = ({
            userName    : req.body.userName, 
            email       : req.body.email,
            password    : req.body.password,  
        });


        let user = await User.create(newUser);

        //return res.status(201).json(user);
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const email = req.params.email;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mise à jour des champs uniquement si une nouvelle valeur est fournie
        if (req.body.userName) user.userName = req.body.userName;
        if (req.body.email) user.email = req.body.email;

        // Si un mot de passe est fourni, on le hash avant de le stocker
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        await user.save(); // Correction ici

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.delete = async(req, res, next) => {
    try{
        await User.deleteOne({email: req.params.email});

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.authenticate = async(req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email}, { createdAt: 0, updatedAt: 0 });
        if (user) {
            bcrypt.compare(password, user.password, function(err, response){
                if (err) {
                    return res.status(500).json('Error comparing password');
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign(
                        { user: user },
                        process.env.SECRET_KEY, 
                        { expiresIn: expireIn }
                    );

                    res.header('Authorization', 'Bearer' + token);

                    return res.status(200).json({ message: 'authenticate_success', token })
                }
                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}


//vérifier les différentes données fournies avant l’enregistrement en base de données