import Records from '../records'

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
    return Records.Records.aggregate([
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
                    "$gt": parseInt(minCount),
                    "$lt": parseInt(maxCount)
                }
            },
        }
    ])
}

export {FilterRecords}
