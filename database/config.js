const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('DataBase Connected');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConecction,
}