const mongoose = require('mongoose');

const connection = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected Successfully");
        })
        .catch((e) => {
            console.log(`Error while connecting mongoDB ${e}`);
        })
}

module.exports = connection;