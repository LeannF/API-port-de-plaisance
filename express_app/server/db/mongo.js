const mongoose= require('mongoose');

const clientOptions = {
    dbName          : 'pdp'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connecté à MongoDB');
    } catch (error) {
        console.log('Erreur de connexion :', error);
        throw error;
    }
};