import mongoose, {Schema} from 'mongoose';

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

const Records = mongoose.model('Records', recordsSchema);

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
