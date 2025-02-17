const Catway = require('../models/catway');

exports.getById = async(req, res, next) => {
    const id = req.params.id

    try{
        let catway = await Catway.findById(id);
        if (catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('Catway not found');
    }catch (error){
        return res.status(501).json("Invalid catway ID format");
    }
}

exports.getAllCatways = (req, res, next) => {
    Catway.find()  
    .then(catway => {
        res.status(200).json(catway);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
}

exports.add = async(req, res, next) => {
    const temp = ({
        catwayNumber    : req.body.catwayNumber, 
        catwayType      : req.body.catwayType,
        catwayState     : req.body.catwayState,  
    });

    try{
        let catway = await Catway.create(temp);

        return res.status(201).json(catway);
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async(req, res, next) => {
    const id = req.params.id
    
    const temp = ({
        catwayState     : req.body.catwayState,  
    });

    try{
        let catway = await Catway.findOne({_id : id});

        if (catway) {
            Object.keys(temp).forEach((key) =>{
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });
            await catway.save();
            return res.status(201).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.delete = async(req, res, next) => {
    const id = req.params.id

    try{
        await catway.deleteOne({_id : id});

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

//vérifier les différentes données fournies avant l’enregistrement en base de données