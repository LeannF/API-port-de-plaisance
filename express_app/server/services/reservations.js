const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

exports.getByCatwayNumber = async(req, res) => {
    try{
        const reservation = await Reservation.findOne({ 
            _id: req.params.idReservation,
            catwayNumber: req.params.id 
        });
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        res.status(200).json(reservation);
    }catch (error){
        return res.status(501).json("Invalid reservation ID format");
    }
}

exports.getAllReservationsBycatwayNumber = async(req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        const reservations = await Reservation.find({ catwayNumber: req.params.id });

        if (!reservations.length) {
            return res.status(404).json({ message: "Aucune réservation trouvée pour ce catway" });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

exports.add = async (req, res) => {
    try {
        const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
        const catwayExists = await Catway.findOne({ catwayNumber });

        if (!catwayExists) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        /** Création de la réservation avec la bonne référence */ 
        const newReservation = {
            catwayNumber: req.body.catwayNumber, 
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };
        await Reservation.create(newReservation);

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


exports.update = async(req, res) => {
    const temp = ({
        catwayNumber    : req.body.catwayNumber, 
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,  
        startDate       : req.body.startDate,
        endDate         : req.body.endDate,
    });
    try{
        let reservation = await Reservation.findOne({ catwayNumber: req.params.id });

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

exports.delete = async(req, res) => {
    try{
        await Reservation.deleteOne({ 
            _id: req.params.idReservation,
            catwayNumber: req.params.id 
        });
        return res.status(204).json('delete_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}