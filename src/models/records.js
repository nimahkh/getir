import mongoose, {Schema} from 'mongoose';

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

/**
 * filter function to do an aggregation on mongo to achieve data and map them
 * @param startDate
 * @param endDate
 * @param minCount
 * @param maxCount
 * @returns {Aggregate<Array<any>>}
 * @constructor
 */
const FilterRecords = (startDate, endDate, minCount, maxCount) => {
    return Records.aggregate([
        {
            $addFields: {
                totalCount: {$sum: "$counts"},
            }
        },
        {$unset: ["_id", "counts", "value"]},
        {
            "$match": {
                "createdAt": {
                    "$gte": new Date(startDate),
                    "$lt": new Date(endDate)
                }
            },
        },
        {
            "$match": {
                "totalCount": {
                    "$gt": minCount,
                    "$lt": maxCount
                }
            },
        }
    ])
}

export default {Records, FilterRecords};
