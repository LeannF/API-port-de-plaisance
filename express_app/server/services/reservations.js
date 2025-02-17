const Reservation = require('../models/reservation');


exports.getById = async(req, res, next) => {
    const id = req.params.id

    try{
        let reservation = await Reservation.findById(id);
        if (reservation) {
            return res.status(200).json(reservation);
        }
        return res.status(404).json('Reservation not found');
    }catch (error){
        return res.status(501).json("Invalid reservation ID format");
    }
}

exports.getAllReservations = (req, res, next) => {
    Reservation.find()  
    .then(reservation => {
        res.status(200).json(reservation);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
}


exports.add = async(req, res, next) => {
    const temp = ({
        catwayNumber    : req.body.catwayNumber, 
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,  
        startDate       : req.body.startDate,
        endDate         : req.body.endDate,
    });

    try{
        let reservation = await reservation.create(temp);

        return res.status(201).json(reservation);
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async(req, res, next) => {
    const id = req.params.id
    
    const temp = ({
        catwayNumber    : req.body.catwayNumber, 
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,  
        startDate       : req.body.startDate,
        endDate         : req.body.endDate,
    });

    try{
        let reservation = await Reservation.findOne({_id : id});

        if (reservation) {
            Object.keys(temp).forEach((key) =>{
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });
            await reservation.save();
            return res.status(201).json(reservation);
        }

        return res.status(404).json('reservation_not_found');
    } catch(error){
        return res.status(501).json(error);
    }
}

exports.delete = async(req, res, next) => {
    const id = req.params.id

    try{
        await reservation.deleteOne({_id : id});

        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

//vérifier les différentes données fournies avant l’enregistrement en base de données