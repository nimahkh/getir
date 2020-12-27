import mongoose from 'mongoose';
import config from "../config";
import Records from "./records";
import 'regenerator-runtime/runtime'

const structure = {
    key: 'wwuocnCQ',
    createdAt: '2016-01-29T13:50:20.488Z',
    totalCount: 3790
}

describe('Mongo Aggregation filter Test', () => {
    let connection, result, getObjects, expectedOetObjects;
    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        connection = await  mongoose.connect(config.mongo_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: config.database,
            readPreference: 'nearest'
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });

        const filters ={
            endDate:"2016-02-02",
            startDate:"2016-01-29",
            minCount: 2000,
            maxCount:4000
        }

        const {endDate,startDate,minCount,maxCount} = filters
        result =  await Records.FilterRecords(startDate,endDate,minCount,maxCount)
        getObjects= Object.keys(result[0])
        expectedOetObjects= Object.keys(structure)
    });

    afterAll(async () => {
        await connection.close();
    });

    it("if key exists in structure", async () => {
        jest.useFakeTimers()
        expect(getObjects[0]).toBe(expectedOetObjects[0]);
    })

    it("if key createdAt in structure", async () => {
        jest.useFakeTimers()
        expect(getObjects[1]).toBe(expectedOetObjects[1]);
    })

    it("if key totalCount in structure", async () => {
        jest.useFakeTimers()
        expect(getObjects[2]).toBe(expectedOetObjects[2]);
    })
})
