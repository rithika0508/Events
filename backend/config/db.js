const mongoose = require("mongoose");

const ConnectDB = async () => {
    console.log("1")
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("connected")
}
module.exports = ConnectDB;