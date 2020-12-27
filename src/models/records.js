import mongoose, {Schema} from 'mongoose';
import {FilterRecords} from "./repositories/filter";

/**
 * create a scheme to modeling the collection
 * @type {module:mongoose.Schema<any>}
 */
const recordsSchema = new mongoose.Schema(
    {
        key: String,
        createdAt: Schema.Types.Date,
        counts: Object,
    },
    {
        collection: "records",
    },
);

//create the model base on scheme
const Records = mongoose.model('Records', recordsSchema);

export default {Records, FilterRecords};
