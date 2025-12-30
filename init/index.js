const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data } = require("./data");

mongoose.connect("mongodb+srv://surajrawat983iyc_db_user:gSPMBLRKGeo2acbz@cluster0.qpefe2x.mongodb.net/?appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Data initialized");
    mongoose.connection.close();
};

initDB();
