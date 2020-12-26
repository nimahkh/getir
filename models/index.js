import mongoose from "mongoose"
import config from "../config";
import Records from "./records"

export const connectDb = () => {
    return mongoose.connect(config.mongo_url, {useUnifiedTopology: true ,useNewUrlParser: true, dbName: config.database, readPreference: 'nearest',});
};

const models = {Records}

export default models