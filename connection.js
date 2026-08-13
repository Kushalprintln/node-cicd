const mongoose = require('mongoose');

const connection = async () => {
    mongoose.connect("mongodb+srv://kushsonkamble_db_user:kXEVkuoHSn09BJLL@cluster0.gqdimya.mongodb.net/Test2?appName=Cluster0")
        .then(() => {
            console.log("MongoDB Connected Successfully");
        })
        .catch((e) => {
            console.log(`Error while connecting mongoDB ${e}`);
        })
}

module.exports = connection;