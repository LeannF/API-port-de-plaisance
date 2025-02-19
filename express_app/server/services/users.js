const User = require('../models/user');

exports.getByEmail = async(req, res, next) => {
    const email = req.params.email

    try{
        let user = await User.findByEmail(email);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('User not found');
    }catch (error){
        return res.status(501).json("Invalid user ID format");
    }
}
exports.getAllUsers = (req, res, next) => {
    User.find()  
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
}


exports.add = async(req, res, next) => {
    const temp = ({
        userName    : req.body.userName, 
        email       : req.body.email,
        password    : req.body.password,  
    });

    try{
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async(req, res, next) => {
    const email = req.params.email
    
    const temp = ({
        userName    : req.body.userName, 
        email       : req.body.email,
        password    : req.body.password,  
    });

    try{
        let user = await User.findOne({_email : email});

        if (user) {
            Object.keys(temp).forEach((key) =>{
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await User.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.delete = async(req, res, next) => {
    const email = req.params.email

    try{
        await User.deleteOne({_email : email});

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

//vérifier les différentes données fournies avant l’enregistrement en base de données