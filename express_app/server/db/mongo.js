const mongoose= require('mongoose');

const clientOptions = {
    dbName          : 'pdp'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://LeyLey:J8tYT8GCegzYGJ@port-de-plaisance.hiye4.mongodb.net/?retryWrites=true&w=majority&appName=Port-de-Plaisance", clientOptions);
        console.log('Connecté à MongoDB');
    } catch (error) {
        console.log('Erreur de connexion :', error);
        throw error;
    }
};