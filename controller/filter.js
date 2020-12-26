import {response} from "../utils"
import {filterRequest} from "./requests/filter"

//Filter controller

function filter(req, res) {
    const {Records} = req.context.models
    const data =req.body
    const {startDate, endDate, minCount, maxCount} =  data
    const validate =filterRequest.validate(data)

    //validate
    if(validate.error){
        const {message} = validate.error
        response(message, {records: []}, res);
        return false;
    }

    const result=Records
        .aggregate([
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
    result.then((records)=>{
        response(null, {records: records}, res);
    })
}

export default {filter}