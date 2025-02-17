const User = require('../models/user');

exports.getById = async(req, res, next) => {
    const id = req.params.id

    try{
        let user = await User.findById(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('User not found');
    }catch (error){
        return res.status(501).json("Invalid user ID format");
    }
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
    const id = req.params.id
    
    const temp = ({
        userName    : req.body.userName, 
        email       : req.body.email,
        password    : req.body.password,  
    });

    try{
        let user = await User.findOne({_id : id});

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
    const id = req.params.id

    try{
        await User.deleteOne({_id : id});

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

//vérifier les différentes données fournies avant l’enregistrement en base de données