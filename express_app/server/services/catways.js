const Catway = require('../models/catway');

exports.getById = async(req, res) => {
    try{
        let catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('Catway not found');
    }catch (error){
        return res.status(501).json("Invalid catway ID format");
    }
}

exports.getAllCatways = async() => {
    try {
        /**  Retourne directement les catways */
        return await Catway.find().lean(); 
    } catch (error) {
        console.error("Erreur lors de la récupération des catways :", error);
        /** Retourne un tableau vide en cas d'erreur */
        return []; 
    }
}

exports.add = async(req, res, next) => {
    try{
        const { catwayNumber, catwayType, catwayState } = req.body;
        const newCatway = ({
            catwayNumber    : req.body.catwayNumber, 
            catwayType      : req.body.catwayType,
            catwayState     : req.body.catwayState,  
        });

        await Catway.create(newCatway);

    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async(req, res) => {    
    const temp = ({
        catwayNumber    : req.params.id,
        catwayState     : req.body.catwayState,  
        catwayType      : req.params.catwayType
    });

    try{
        let catway = await Catway.findOne({ catwayNumber: req.params.id });
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

exports.delete = async(req, res) => {
    try{
        await Catway.deleteOne({ catwayNumber: req.params.id });

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}